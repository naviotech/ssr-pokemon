import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-skeleton',
  imports: [],
  templateUrl: './pokemon-skeleton.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonSkeletonComponent { }
