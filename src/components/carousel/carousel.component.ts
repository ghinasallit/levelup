import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AppService} from "../../app/app.service";
import {DataService} from "../../services/data.service";
import {BannerModel} from "../../models/banner.model";
import {FuseSplashScreenService} from "../../services/fuse-splash-screen.service";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  banner: BannerModel[] = [];
  isLogin = false;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    focusOnSelect: true,
    autoplaySpeed: 2000,
    dots: true,
  };

  constructor(private restService: DataService,
              public appService: AppService,
              private fuseSplashScreenService: FuseSplashScreenService,
              private router: Router,
              private toastr: ToastrService) {
  }


  getBanner() {
    this.restService.getBanner().then((res) => {
      this.banner = res.results;
      setTimeout(() => {
        this.fuseSplashScreenService.hide();
      }, 1000);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  ngOnInit(): void {
    this.fuseSplashScreenService.show();
    this.getBanner();
    this.appService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.isLogin = true;
      }
    });
  }


}
