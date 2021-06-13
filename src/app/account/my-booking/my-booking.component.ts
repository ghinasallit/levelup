import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../../services/data.service";
import {AppService} from "../../app.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Paginations} from "../../../models/paginations";
import {BookPackageModel} from "../../../models/book -package.model";
import {CategoryModel} from "../../../models/category.model";
import {BookClassModel} from "../../../models/book-class.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {
  panelOpenState = false;
  pagination = new Paginations();
  myPackages: BookPackageModel [] = [];
  current = new Date();
  categories: CategoryModel[] = [];
  bookClasses: BookClassModel[] = [];

  constructor(private restService: DataService,
              public appService: AppService,
              private router: ActivatedRoute,
              private toastr: ToastrService) {
    this.pagination.page = 0;
    this.pagination.limit = 6;

  }


  getUserCategories() {
    this.restService.getUserCategories().then((res) => {
      this.categories = res.results;
      this.pagination.id = this.categories[0]._id;
      this.getMyPackages();

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        // this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }



  getMyPackages() {
    this.restService.getMyPackages(this.pagination).then((res) => {
      this.myPackages = res.results;
      this.myPackages.forEach(item => {
        item.bookedClasses = item.bookingclasses.filter(data => +data.status !== 1 );
      });
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }


  confirmeCancel(item: BookClassModel) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure you want to cancel this class ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it'
    })
      .then(result => {
        if (result.value) {
          this.cancelClass(item);

        }
      });
  }

  cancelClass(item: BookClassModel){
    item.status = '1';
    this.restService.UpdateClass(item).then((res) => {
      Swal.fire(
        'Delete',
        'The class has been canceled successfully',
        'success'
      );
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        item.status = '0';
        this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  ngOnInit(): void {
    this.getUserCategories();

  }

}
