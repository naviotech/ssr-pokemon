import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from './app.routes';
import { Location } from '@angular/common';

describe('App Routes', () => {
  let router: Router;
  let location: Location;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "about redirects to "/about" ', async () => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about')
  });
  it('should navigate to "unknown" redirects to "/about" ', async () => {
    await router.navigate(['unknown-page']);
    expect(location.path()).toBe('/about')
  });

  it('should load the proper component ', async () => {
    const abouRoute = routes.find((route)=> route.path === 'about')!
    expect(abouRoute).toBeDefined()

    const aboutComponent = await abouRoute.loadComponent!() as any
    expect(aboutComponent.default.name).toBe('AboutPageComponent')
  });

  it('should load the proper component ', async () => {
    const pokemonRoute = routes.find((route)=> route.path === 'pokemon/:id')!
    expect(pokemonRoute).toBeDefined()

    const aboutComponentPokemon = await pokemonRoute.loadComponent!() as any
    expect(aboutComponentPokemon.default.name).toBe('PokemonPageComponent')
  });
});
