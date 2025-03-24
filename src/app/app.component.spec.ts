import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';

@Component({
  selector: 'nav-bar',
})
class NavBarComponentMock {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compiled: HTMLElement;
  let app: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    })
      .overrideComponent(AppComponent, {
        add: {
          imports: [NavBarComponentMock],
        },
        remove:{
          imports: [NavBarComponent]
        }
      })
      .compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'pokemon-ssr' title`, () => {
    expect(app.title).toEqual('pokemon-ssr');
  });

  it('should render the navbar and router-outlet', () => {
    expect(compiled.querySelector('nav-bar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
