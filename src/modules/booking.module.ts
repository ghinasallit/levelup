import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from '../app/booking/booking.component';
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {CalendarModule, CalendarWeekModule} from "angular-calendar";
import {CalendarHeaderComponent} from "../components/utils-calender-header/calender-header.component";
import {NgxShimmerLoadingModule} from "ngx-shimmer-loading";

const routes: Routes = [
  {
    path: '', component: BookingComponent,
  }
];


@NgModule({
  declarations: [BookingComponent , CalendarHeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
    CalendarWeekModule,
    CalendarModule,
    NgxShimmerLoadingModule
  ]
})


export class BookingModule { }
