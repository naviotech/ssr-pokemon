import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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
        }),
      );
  }

  loadPokemon(id:string):Observable<PokemonUnique>{
    return this.#http.get<PokemonUnique>(`https://pokeapi.co/api/v2/pokemon/${id}`)
  }
}
