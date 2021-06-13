import {Injectable} from '@angular/core';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {AppService} from './app.service';

const APP_TITLE = 'My Website';
const SEPARATOR = ' - ';

@Injectable({
  providedIn: 'root'
})
export class AppTitleService {
  $onLangChange: Subscription;
  $onDefaultLangChange: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private appService: AppService,
    private translate: TranslateService
  ) {
    this.appService.language.subscribe(() => {
      this.$onLangChange = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        const child = this.activatedRoute.firstChild;
        if (child) {
          if (child.snapshot.data.title) {
            this.titleService.setTitle(APP_TITLE + ' - ' + this.translate.instant(child.snapshot.data.title));
          }
        }
        this.$onLangChange.unsubscribe();
      });
      this.$onDefaultLangChange = this.translate.onDefaultLangChange.subscribe((event: LangChangeEvent) => {
        const child = this.activatedRoute.firstChild;
        if (child) {
          if (child.snapshot.data.title) {
            this.titleService.setTitle(APP_TITLE + ' - ' + this.translate.instant(child.snapshot.data.title));
          }
        }
        this.$onDefaultLangChange.unsubscribe();
      });
    });
  }

  // tslint:disable-next-line:member-ordering
  static ucFirst(value: string) {
    if (!value) {
      return value;
    }
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  init() {
    this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .map(() => {
        let route = this.activatedRoute;
        // tslint:disable-next-line:curly
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter((route) => route.outlet === 'primary')
      .mergeMap((route) => route.data)
      .map((data) => {
        if (data.title) {
          // If a route has a title set (e.g. data: {title: "Foo"}) then we use it
          return data.title;
        } else {
          // If not, we do a little magic on the url to create an approximation
          return this.router.url.split('/').reduce((acc, frag) => {
            if (acc && frag) {
              acc += SEPARATOR;
            }
            return acc + AppTitleService.ucFirst(frag);
          });
        }
      })
      .subscribe((pathString) => {
        this.translate.get(pathString).subscribe(() => {
          this.titleService.setTitle(`${APP_TITLE} - ` + this.translate.instant(pathString));
        });
      });
  }
}
