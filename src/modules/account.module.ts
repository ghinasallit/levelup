import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from '../app/account/account.component';
import {ProfileComponent} from '../app/account/profile/profile.component';
import {RouterModule, Routes} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {PrivacyComponent} from '../app/account/privacy/privacy.component';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MyBookingComponent} from "../app/account/my-booking/my-booking.component";
import {MatExpansionModule} from "@angular/material/expansion";

const routes: Routes = [
  {
    path: '', component: AccountComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: {
          title: '_Profile'
        }
      },
      {
        path: 'privacy',
        component: PrivacyComponent,
        data: {
          title: '_Privacy'
        }
      },
      {
        path: 'my-booking',
        component: MyBookingComponent,
        data: {
          title: '_MyBooking'
        }
      },
      {
        path: '',
        redirectTo: 'profile'
      },
    ]
  }
];


@NgModule({
  declarations: [AccountComponent, ProfileComponent, PrivacyComponent , MyBookingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    FormsModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,

  ]
})
export class AccountModule {
}
