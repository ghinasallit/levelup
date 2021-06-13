import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {CategoryModel} from "../models/category.model";

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public language = new BehaviorSubject<string>(null);
  lang: string;
  currentLanguage: string;
  public isUserLoggedIn: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  public name: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  categories: CategoryModel[] = [];


  constructor(private translate: TranslateService,
              public jwtHelper: JwtHelperService,
  ) {

    /*** Language Configurations **/
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', 'en');
    }
    const browserLang = localStorage.getItem('language');
    translate.setDefaultLang(browserLang.match(/en|ar/) ? browserLang : 'en');
    this.language.next(browserLang);


    const token = localStorage.getItem('auth_token_levelup') ? this.jwtHelper.decodeToken(localStorage.getItem('auth_token_levelup')).sub : '';
    this.isUserLoggedIn.next(token);
    this.lang = browserLang === 'en' ? 'ltr' : 'rtl';

    const name = localStorage.getItem('name') ? (localStorage.getItem('name')) : '';
    this.name.next(name);
  }

  /* Switch Language */
  switchLanguage(language: string) {
    localStorage.setItem('language', language);
    this.language.next(language);
    this.translate.use(language);
  }


  saveURL(url){
    localStorage.setItem('url' , url );
  }

}
