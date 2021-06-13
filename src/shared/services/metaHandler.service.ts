import {Injectable} from '@angular/core';
import {Meta} from '@angular/platform-browser';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MetaHandlerService {
  defaultDescription = 'gym description';
  defaultKeywords = 'GYM, Sport, YOGA';
  defaultAuthor = 'Crowd';
  defaultImage = 'assets/images/app.png';
  defaultName = 'GYm name';
  defaultTitle = 'gym titlr';
  defaultUrl = environment.appUrl;
  defaultType = 'Government';

  constructor(private metaTagService: Meta) {
  }

  updateDescription(description: string) {
    /* HTML */
    this.metaTagService.updateTag({name: 'description', content: description});

    /* Google */
    this.metaTagService.updateTag({itemprop: 'description', content: description});

    /* Facebook */
    this.metaTagService.updateTag({property: 'og:description', content: description});

    /* Twitter */
    this.metaTagService.updateTag({name: 'twitter:description', content: description});
  }

  updateImage(image: string) {
    /* HTML */
    this.metaTagService.updateTag({name: 'image', content: image});

    /* Google */
    this.metaTagService.updateTag({itemprop: 'image', content: image});

    /* Facebook */
    this.metaTagService.updateTag({property: 'og:image', content: image});

    /* Twitter */
    this.metaTagService.updateTag({name: 'twitter:image', content: image});
  }

  updateTitle(title: string) {
    /* Facebook */
    this.metaTagService.updateTag({property: 'og:title', content: title});

    /* Twitter */
    this.metaTagService.updateTag({name: 'twitter:title', content: title});
  }

  setDefaultMeta() {
    this.metaTagService.addTags([
      /* HTML */
      {name: 'description', content: this.defaultDescription},
      {name: 'image', content: this.defaultImage},
      {name: 'keywords', content: this.defaultKeywords},
      {name: 'author', content: this.defaultAuthor},
      {name: 'date', content: new Date().toString(), scheme: 'YYYY-MM-DD'},
      {charset: 'UTF-8'},

      /* Google */
      {itemprop: 'description', content: this.defaultDescription},
      {itemprop: 'image', content: this.defaultImage},
      {itemprop: 'name', content: this.defaultName},

      /* Facebook */
      {property: 'og:description', content: this.defaultDescription},
      {property: 'og:image', content: this.defaultImage},
      {property: 'og:title', content: this.defaultTitle},
      {property: 'og:url', content: this.defaultUrl},
      {property: 'og:type', content: this.defaultType},

      /* Twitter */
      {name: 'twitter:description', content: this.defaultDescription},
      {name: 'twitter:image', content: this.defaultImage},
      {name: 'twitter:title', content: this.defaultTitle},
      {name: 'twitter:card', content: ''}
    ]);
  }
}
