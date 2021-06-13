import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable, NgZone} from '@angular/core';
import {ApiService} from './api.service';
import {environment} from '../environments/environment';
import {TokenModel, UserModel} from '../models/user.model';
import {Paginations, ScheduleBooking} from "../models/paginations";
import {ContactModel} from "../models/contact.model";
import {BookModel} from "../models/book.model";
import {BookClassModel} from "../models/book-class.model";
import {AuthService} from "angularx-social-login";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class DataService extends ApiService {
  baseUrl = '';
  progressCount = 0;
  data: any[];
  fileUrl = '';

  constructor(public httpClient: HttpClient,
              private ngZone: NgZone,
              private authService: AuthService,
              private router: Router,

  ) {
    super(httpClient);

    this.baseUrl = environment.apiURI;
    this.fileUrl = environment.fileUrl;

    this.currentProgress.subscribe((progress: string) => {
      this.ngZone.run(() => {
        this.progressCount = Number(progress);
      });
    });
  }


  login(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/login`, null, type);
  }

  register(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/register`, null, type);
  }

  getProfile() {
    return this.restRequest(null, `${this.baseUrl}/users/profile`, null, 'GET');
  }

  getMyPackages(pagination: Paginations) {
    return this.restRequest(null, `${this.baseUrl}/booking/package?category=${pagination.id}&sortBy=createdAt:desc`, null, 'GET');
  }

 getContent(type: string) {
    return this.restRequest(null, `${this.baseUrl}/content/type/${type}`, null, 'GET');
  }

  contactus(model: ContactModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/contact`, null, type);
  }

  updateFCM(model: Paginations, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/users/fcm`, null, type);
  }

  updateProfile(model: UserModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/users/profile`, null, type);
  }

  UpdateClass(model: BookClassModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/booking/classes/${model._id}`, null, type);
  }


  refreshToken(model: TokenModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/refresh-tokens`, null, type);
  }


  bookClass(model: BookClassModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/booking/classes`, null, type);
  }

  sendOTP(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/otpSend`, null, type);
  }


  uploadFile(formData: FormData, type: string = 'POST') {
    return this.restRequest(null, `${this.baseUrl}/file/image`, null, type, false, formData);
  }


  resetPassword(model: UserModel, type: string = 'PUT') {
    return this.restRequest(model, `${this.baseUrl}/auth/change-password-otp`, null, type);
  }

  forgetPassword(model: UserModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/auth/otpSend`, null, type);
  }

  bookPackage(model: BookModel, type: string = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/booking/package`, null, type);
  }

  getBanner() {
    return this.restRequest(null, `${this.baseUrl}/banners`, null, 'GET');
  }

  getUserCategories() {
    return this.restRequest(null, `${this.baseUrl}/category/user?sortBy=createdAt:desc`, null, 'GET');
  }

  getCategories() {
    return this.restRequest(null, `${this.baseUrl}/category`, null, 'GET');
  }

  getSchedule(id) {
    return this.restRequest(null, `${this.baseUrl}/schedule?category=${id}`, null, 'GET');
  }

  getScheduleBooking(model: ScheduleBooking) {
    return this.restRequest(null, `${this.baseUrl}/schedule?category=${model.category}&date=${model.date}&numberOfDays=${model.day}&bookingPackages=${model.package}`, null, 'GET');
  }

  getEvents() {
    return this.restRequest(null, `${this.baseUrl}/events`, null, 'GET');
  }

  getPackages(pagination: Paginations) {
    return this.restRequest(null, `${this.baseUrl}/package?category=${pagination.id}&page=${pagination.page}&limit=${pagination.limit}`, null, 'GET');
  }


  refreshTokenUser() {
    const token = new TokenModel();
    token.refreshToken = localStorage.getItem('refresh_token');

    this.refreshToken(token).then((res) => {
      localStorage.setItem('auth_token_levelup', res.access.token);
      localStorage.setItem('refresh_token', res.refresh.token);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        localStorage.removeItem('auth_token_deliver');
        localStorage.removeItem('refresh_token');
        this.authService.signOut();
        this.router.navigateByUrl('/auth/login');
        // this.toastr.error(err.error.message, '');../models/Shipment.model
      }
    });
  }

}
