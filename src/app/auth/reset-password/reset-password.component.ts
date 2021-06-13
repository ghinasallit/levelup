import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserModel} from '../../../models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {AppService} from '../../app.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {MustMatch} from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  lang: string;

  constructor(private fb: FormBuilder,
              public restService: DataService,
              public appService: AppService,
              private toastr: ToastrService,
              private router: Router) {
  }


  get f() {
    return this.resetPasswordForm.controls;
  }


  onSubmit() {
    // tslint:disable-next-line:prefer-const
    let userModel: UserModel = this.resetPasswordForm.value as UserModel;
    userModel.phone = localStorage.getItem('phone');

    this.restService.resetPassword(userModel).then((res) => {

      this.toastr.success(res.message, '');
      this.router.navigateByUrl('/auth/login');

      localStorage.setItem('auth_token_levelup', res.token);

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }

  prepareForm() {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', Validators.required],
      phone: [''],
      otp: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4)]],

    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

  }

  ngOnInit() {
    window.scroll(0, 0);

    this.prepareForm();
    this.lang = this.appService.currentLanguage === 'en' ? 'ltr' : 'rtl';


  }

}
