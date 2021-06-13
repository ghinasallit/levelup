import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {DataService} from '../../../services/data.service';
import {UserModel} from '../../../models/user.model';
import {ToastrService} from 'ngx-toastr';
import {AppService} from "../../app.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              private restService: DataService,
              private toastr: ToastrService,
              public appService: AppService) { }

  get r() {
    return this.profileForm.controls;
  }


  getProfile() {
    this.restService.getProfile().then((res) => {
      this.profileForm.patchValue(res);
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        if(err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  updateProfile() {
    const user: UserModel = this.profileForm.value as UserModel;
    this.restService.updateProfile(user).then((res) => {
      this.toastr.success( res.message , '');
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
        if(err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  prepareForm() {
    this.profileForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      role: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
    });
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getProfile();
  }
}
