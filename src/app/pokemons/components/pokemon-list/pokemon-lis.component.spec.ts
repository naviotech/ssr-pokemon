import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';

import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../interfaces/pokemon.simple.interface';

const mockPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemonList', []);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the pokemon list with 2 pokemon-card', () => {
    fixture.componentRef.setInput('pokemonList', mockPokemons);
    fixture.detectChanges();

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(
      mockPokemons.length
    );
  });

});
