import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private title: Title, private meta: Meta, private router: Router) { }

  generateTags({ title = '', description = '', image = '' }) {

    this.title.setTitle(title);
    this.meta.addTags([
      // Open Graph
      {username: 'og:url', content: `https://ng-client.fireship.io${this.router.url}` },
      {username: 'og:title', content: title },
      {username: 'og:description', content: description },
      {username: 'og:image', content: image },
      // Twitter Card
      {username: 'twitter:card', content: 'summary' },
      {username: 'twitter:site', content: '@fireship_dev' },
    ]);
  }
}
