import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from '../app/details/details.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

const routes: Routes = [
  {
    path: '', component: DetailsComponent,
  }
];

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
    InfiniteScrollModule
  ]
})
export class DetailsModule { }
