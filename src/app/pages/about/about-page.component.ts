import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoService } from '../../shared/services/seo.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPageComponent implements OnInit {
  #seoService = inject(SeoService);
  #platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    this.#seoService.updateMetaTags({
      title: 'About',
      description: 'Esta es nuestra descripción de about',
      url: 'https://tu-dominio.com/about',
      image: 'https://tu-dominio.com/assets/images/seo-image.jpg',
    });
    // if(isPlatformBrowser(this.#platform)){
    //   jskdfhsdkfjsd
    // }
  }
}
