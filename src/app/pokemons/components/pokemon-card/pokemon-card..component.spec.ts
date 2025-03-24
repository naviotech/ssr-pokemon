import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { PokemonCardComponent } from './pokemon-card.component';
import { SimplePokemon } from '../../interfaces/pokemon.simple.interface';
import e from 'express';
import { equal } from 'assert';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'bulbasaur',
};

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the simplePokemon signal inputvalue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });
  it('should render the pokemon name and image correctly', () => {
    const image = compiled.querySelector('img')!;
    expect(image).toBeDefined();
    const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${mockPokemon.id}.png`;

    expect(image.src).toBe(imageUrl);
    expect(compiled.textContent?.trim()).toBe(mockPokemon.name);
  });

  it('should have the proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div');

    expect(
      divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value
    ).toBe(`/pokemon,${mockPokemon.name}`);
  });
});
