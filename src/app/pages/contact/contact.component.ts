import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactComponent implements OnInit{
  #seoService = inject(SeoService);

  ngOnInit(): void {
    this.#seoService.updateMetaTags({
      title: 'Contact',
      description: 'Esta es nuestra descripción de contacto',
      url: 'https://tu-dominio.com/contact',
      image: 'https://tu-dominio.com/assets/images/seo-image.jpg'
    });
  }
}
