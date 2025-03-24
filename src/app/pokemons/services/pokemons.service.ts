import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { SimplePokemon } from '../interfaces/pokemon.simple.interface';
import { PokeResponse } from '../interfaces/pokemon.response.interface';
import { PokemonUnique } from '../interfaces/pokemon.unique.interface';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  #http = inject(HttpClient);

  loadPage(page: number): Observable<SimplePokemon[]> {
    if (page !== 0) {
      --page;
    }
    page = Math.max(0, page);

    return this.#http
      .get<PokeResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 12}&limit=12`
      )
      .pipe(
        map((resp) => {
          const simplePokemon: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );
          return simplePokemon;
        })
      );
  }

  loadPokemon(id: string): Observable<PokemonUnique> {
    return this.#http
      .get<PokemonUnique>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(catchError(this.#handleError));
  }

  #handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      //Error conection
      console.log('An error ocurred', error.error);
    } else {
      console.log(`Backend returned code ${error.status}, body:`, error.error);
    }

    const errorMessage = error.error ?? 'An error ocurred';

    return throwError(() => new Error(errorMessage));
  }
}
