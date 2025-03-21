import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPageComponent implements OnInit {
  #seoService = inject(SeoService);

  ngOnInit(): void {
    this.#seoService.updateMetaTags({
      title: 'Pricing',
      description: 'Esta es nuestra descripción de pricing',
      url: 'https://tu-dominio.com/pricing',
      image: 'https://tu-dominio.com/assets/images/seo-image.jpg',
    });
  }
}
