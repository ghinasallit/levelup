import {BrowserModule, BrowserTransferStateModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {AppTitleService} from './app.title.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ErrorDialogService} from '../providers/error-dialog/errordialog.service';
import {InterceptorProvider} from '../providers/interceptor';
import {MainRestService} from '../shared/services/main.rest';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import {JWTService} from '../shared/utils/JWTtoken.service';
import {ConfigService} from '../shared/utils/config.service';
import {AuthGuard} from '../guards/auth.guard';
import {ErrorDialogComponent} from '../providers/error-dialog/errordialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import {ToastrModule} from 'ngx-toastr';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {MessagingService} from "../services/messaging.service";
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {CalendarHeaderComponent} from "../components/utils-calender-header/calender-header.component";
import {NgxShimmerLoadingModule} from "ngx-shimmer-loading";


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new MultiTranslateHttpLoader(httpClient, [
    {prefix: './assets/i18n/', suffix: '.json'}
  ]);
}

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('179359635059-97oc7uii7dn47i0vbkjt73c649n7lnl4.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2566817463608959')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorDialogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    NgxShimmerLoadingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'mytestapp'),
    AngularFirestoreModule, // Only required for database features
    AngularFireAuthModule, // Only required for auth features,
    AngularFireStorageModule, // Only required for storage features
    AngularFireMessagingModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ErrorDialogService,
    ConfigService,
    AuthGuard,
    JWTService,
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
    MainRestService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorProvider, multi: true},
    AppTitleService,
    MessagingService,

    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
