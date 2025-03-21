import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../pokemons/components/pokemon-list/pokemon-list.component';
import { PokemonSkeletonComponent } from '../../pokemons/components/pokemon-skeleton/pokemon-skeleton.component';
import { PokemonsService } from '../../pokemons/services/pokemons.service';
import { SimplePokemon } from '../../pokemons/interfaces/pokemon.simple.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'pokemons-page',
  imports: [PokemonListComponent, PokemonSkeletonComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPageComponent implements OnInit {
  #seoService = inject(SeoService);
  #pokemonService = inject(PokemonsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  pokemons = signal<SimplePokemon[]>([]);
  currentPage = toSignal(
    this.#route.queryParamMap.pipe(
      map((params) => params.get('page') ?? '1'),
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
    this.loadPokemons();
  }
  loadPokemons(page = 0) {
    const pageLoad = this.currentPage()! + page;
    this.#pokemonService
      .loadPage(pageLoad)
      .pipe(
        tap(() =>
          this.#router.navigate([], { queryParams: { page: pageLoad } })
        )
      )
      .subscribe((pokemons) => this.pokemons.set(pokemons));
  }
}
