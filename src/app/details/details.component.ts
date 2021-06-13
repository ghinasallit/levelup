import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AppService} from "../app.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {HttpErrorResponse} from "@angular/common/http";
import {Paginations} from "../../models/paginations";
import {PackageModel} from "../../models/package.model";
import {CategoryModel} from "../../models/category.model";
import {BookModel} from "../../models/book.model";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  pagination = new Paginations();
  packages: PackageModel[] =[];
  allpackages: PackageModel[] = [];
  isLogin = false;
  category: CategoryModel;
  book = new BookModel();

  constructor(public restService: DataService,
              public appService: AppService,
              private router: ActivatedRoute,
              private toastr: ToastrService) {
    this.pagination.page = 0;
    this.pagination.limit = 6;


  }


  getPackages() {
    this.restService.getPackages(this.pagination).then((res) => {
      this.packages = res.results;

      if (this.pagination.page === 0) {
        this.allpackages = res.results;
        let category = this.appService.categories.filter(item => item._id === this.pagination.id);
        this.category = category[0];
      } else {

        this.packages.forEach(item => {
          this.allpackages.push(item);
        });
      }
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  bookPackage(item){
    this.book.package = item._id;
    this.book.validity = item.validity;
    this.restService.bookPackage(this.book).then((res) => {
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
    window.scroll(0 ,0);
    this.router.params.subscribe(params => {
      this.pagination.id = params.id;
      this.getPackages();
    });

    this.appService.isUserLoggedIn.subscribe(value => {
      if (value) {
        this.isLogin = true;
      }
    });
  }

}
