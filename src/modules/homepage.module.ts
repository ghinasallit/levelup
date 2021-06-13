import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from '../app/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {CarouselModule} from '../components/carousel/carousel.module';
import {TranslateModule} from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
  }
];


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ]
})
export class HomepageModule {
}
