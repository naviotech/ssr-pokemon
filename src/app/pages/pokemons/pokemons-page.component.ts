import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonSkeletonComponent } from '../../pokemons/components/pokemon-skeleton/pokemon-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/pokemon.simple.interface';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonSkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit{
  #seoService = inject(SeoService);
  #pokemonService = inject(PokemonsService);
  #route = inject(ActivatedRoute);
  pokemons = signal<SimplePokemon[]>([]);
  currentPage = toSignal<number>(
    this.#route.params.pipe(
      map((params) => params['page'] ?? '1'),
      map((page) => (isNaN(+page) ? 1 : +page)),
      map((page) => Math.max(1, page))
    )
  );

  ngOnInit(): void {
    this.#seoService.updateMetaTags({
      title: 'Pokemons',
      description: 'Esta es nuestra descripción de pokemons',
      url: 'https://tu-dominio.com/pokemons',
      image: 'https://tu-dominio.com/assets/images/seo-image.jpg',
    });

  }

  loadOnPageChange = effect(() => {
    console.log('page', this.currentPage())
    this.loadPokemons(this.currentPage());
  });

  loadPokemons(page = 0) {
    this.#pokemonService
      .loadPage(page)
      .subscribe((pokemons) => this.pokemons.set(pokemons));
  }
}
