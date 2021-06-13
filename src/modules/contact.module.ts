import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {ContactComponent} from "../app/contact/contact.component";

const routes: Routes = [
  {
    path: '', component: ContactComponent,
  }
];

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ReactiveFormsModule,
  ]
})

export class ContactModule { }
