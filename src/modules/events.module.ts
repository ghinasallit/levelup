import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from '../app/events/events.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {CarouselModule} from '../components/carousel/carousel.module';
import {HttpClientModule} from '@angular/common/http';



const routes: Routes = [
  {
    path: '', component: EventsComponent,
  }
];


@NgModule({
  declarations: [
    EventsComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule
  ]
})

export class EventsModule { }
