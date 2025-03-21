import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonUnique } from '../../pokemons/interfaces/pokemon.unique.interface';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { ActivatedRoute } from '@angular/router';
import { SeoService } from '../../shared/services/seo.service';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemon-page',
  imports: [],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  pokemon = signal<PokemonUnique | null>(null);
  #pokemonService = inject(PokemonsService);
  #seoService = inject(SeoService);
  #route = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.#route.snapshot.paramMap.get('id');
    if (!id) return;
    this.#pokemonService
      .loadPokemon(id).pipe(
        tap(pokemon=>{
          this.#seoService.updateMetaTags({
            title: `#${id} - ${pokemon.name}`,
            description: `Página del pokemon ${pokemon.name}`,
            url: 'https://tu-dominio.com/pokemons',
            image: `${pokemon.sprites.other?.['official-artwork']?.front_default}`,
          });
        })
      )
      .subscribe((poke) => this.pokemon.set(poke));
  }
}
