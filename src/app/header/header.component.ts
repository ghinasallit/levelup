import { Component, OnInit } from '@angular/core';
import {AppService} from "../app.service";
import {Router} from "@angular/router";
import {DataService} from "../../services/data.service";
import {AuthService} from "angularx-social-login";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  notificationCount = 0;
  isLogin = false;
  name: string;

  constructor(public appService: AppService,
              private authService: AuthService,
              private router: Router,
              private restService: DataService,
              private fuseSplashScreenService: FuseSplashScreenService,

  ) {
  }


  logout() {
    localStorage.removeItem('auth_token_levelup');
    localStorage.removeItem('refresh_token');
    this.authService.signOut();
    window.location.reload();
  }

  refresh() {
    window.location.reload();

  }

  ngOnInit(): void {
    console.log(this.appService.currentLanguage);
    this.appService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.isLogin = true;
      }
    });

    this.appService.name.subscribe(value => {
      if (value) {
        this.name = value;
      }
    });

    // this.restService.notificationCount.subscribe(value => {
    //   if (value) {
    //     this.notificationCount = value;
    //   } else {
    //     this.notificationCount = 0;
    //   }
    // });

  }

}
