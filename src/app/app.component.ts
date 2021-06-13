import {Component, Inject, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {Meta} from '@angular/platform-browser';
import {AppTitleService} from './app.title.service';
import {DOCUMENT} from '@angular/common';
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../services/data.service";
import {MessagingService} from "../services/messaging.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  message;

  constructor(public appService: AppService,
              // public metaService: MetaHandlerService,
              @Inject(DOCUMENT) private document: Document,
              private metaTagService: Meta,
              private appTitle: AppTitleService,
              private messagingService: MessagingService,
              private restService: DataService,
  ) {

    /*** App Title */
    this.appTitle.init();

  }

  getCategories() {
    this.restService.getCategories().then((res) => {
      this.appService.categories = res.results;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  ngOnInit() {
    // this.metaService.setDefaultMeta();
    /*** Language Subscription **/
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.getCategories();
    this.appService.language.subscribe(language => {
      this.appService.currentLanguage = language === 'en' ? 'en' : 'ar';
      switch (language) {
        case ('en') :
          this.document.documentElement.setAttribute('lang', 'en');
          break;
        case ('ar') :
          this.document.documentElement.setAttribute('lang', 'ar');
          break;
      }
    });

    /*** Meta Tags **/
    this.metaTagService.addTags([
      {name: 'keywords', content: ''},
      {name: 'author', content: ''},
      {name: 'image', content: ''},
      {
        name: 'description',
        content: ''
      },
      {name: 'date', content: new Date().toString(), scheme: 'YYYY-MM-DD'},
      {charset: 'UTF-8'}
    ]);
  }
}
