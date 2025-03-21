import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

interface SeoProps {
  title: string;
  description: string;
  keywords?: string;
  url?: string;
  image?: string;
  author?: string;
  indexable?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  #title = inject(Title);
  #meta = inject(Meta);

  /**
   * Configura los metadatos SEO dinámicamente.
   * @param title Título de la página.
   * @param description Descripción corta (máx. 155 caracteres).
   * @param keywords Palabras clave separadas por comas.
   * @param url URL de la página.
   * @param image Imagen destacada para Open Graph y Twitter.
   */
  updateMetaTags({
    title,
    description,
    keywords = 'angular, SSR, SEO, desarrollo web, optimización',
    url = '',
    image = '',
    author = '',
    indexable = true,
  }: SeoProps) {
    const fullTitle = author.length > 1 ? `${title} | ${author}` : title;
    this.#title.setTitle(fullTitle);

    this.#meta.updateTag({ name: 'description', content: description });
    this.#meta.updateTag({ name: 'keywords', content: keywords });
    this.#meta.updateTag({ rel: 'canonical', href: url });

    // Open Graph
    this.#meta.updateTag({ property: 'og:title', content: fullTitle });
    this.#meta.updateTag({ property: 'og:description', content: description });
    this.#meta.updateTag({ property: 'og:type', content: 'website' });
    this.#meta.updateTag({ property: 'og:url', content: url });
    this.#meta.updateTag({ property: 'og:image', content: image });

    // Twitter Cards
    this.#meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.#meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.#meta.updateTag({ name: 'twitter:description', content: description });
    this.#meta.updateTag({ name: 'twitter:image', content: image });
    this.#meta.updateTag({ name: 'twitter:site', content: '@tuCuentaTwitter' });

    // Robots
    this.#meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
