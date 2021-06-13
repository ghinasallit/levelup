import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../app/about/about.component';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import { SaveHtmlPipe } from '../pipes/save-html.pipe';

const routes: Routes = [
  {
    path: '', component: AboutComponent,
  }
];

@NgModule({
  declarations: [AboutComponent, SaveHtmlPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
  ]
})
export class AboutModule { }
