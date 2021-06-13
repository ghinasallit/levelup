import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule),
    data: {
      title: '_Home'
    }
  },
  {
    path: 'details/:id',
    loadChildren: () => import('../modules/details.module').then(m => m.DetailsModule),
    data: {
      title: '_Details'
    }
  },
  {
    path: 'events',
    loadChildren: () => import('../modules/events.module').then(m => m.EventsModule),
    data: {
      title: '_Events'
    }
  },
  {
    path: 'booking',
    loadChildren: () => import('../modules/booking.module').then(m => m.BookingModule),
    data: {
      title: '_Booking'
    }
  },
  {
    path: 'about',
    loadChildren: () => import('../modules/about.module').then(m => m.AboutModule),
    data: {
      title: '_AboutUs'
    }
  },

  {
    path: 'contact',
    loadChildren: () => import('../modules/contact.module').then(m => m.ContactModule),
    data: {
      title: '_ContactUs'
    }
  },
  {
    path: 'account',
    loadChildren: () => import('../modules/account.module').then(m => m.AccountModule),
    data: {
      title: '_MyAccount'
    }
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth.module').then(m => m.AuthModule),
    data: {
      title: '_Auth'
    },
    // canActivate: [AuthGuard],

  },
  {
    path: '',
    loadChildren: () => import('../modules/homepage.module').then(m => m.HomepageModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },
  {
    path: 'page-404',
    loadChildren: () => import('../modules/page-not-found.module').then(m => m.PageNotFoundModule),
    data: {
      title: '_Home'
    },
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'page-404',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'disabled',
    relativeLinkResolution: 'corrected',
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabled',
    enableTracing: false, useHash: true

  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
