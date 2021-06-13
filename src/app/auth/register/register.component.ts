import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import {DataService} from '../../../services/data.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {MustMatch} from '../../_helpers/must-match.validator';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  partnerForm: FormGroup;
  codeForm: FormGroup;
  isOTP = false;
  active = 1;
  fileName: string;

  constructor(private fb: FormBuilder,
              private restService: DataService,
              private toastr: ToastrService,
              private router: Router,
              public appService: AppService
  ) {
  }

  get p() {
    return this.registerForm.controls;
  }



  prepareForm() {
    this.registerForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      otp: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(9), Validators.pattern(/^[1-9][0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      ConfirmPassword: ['', [Validators.required]],
      roll: ['', [Validators.required]],
      // acceptTerms: ['', Validators.requiredTrue],
    }, {
      validator: MustMatch('password', 'ConfirmPassword')
    });


  }


  register(roll: string) {
    const userModel: UserModel = this.registerForm.value as UserModel;

    this.restService.register(userModel).then((res) => {
      localStorage.setItem('auth_token_levelup', res.tokens.access.token);
      localStorage.setItem('refresh_token', res.tokens.refresh.token);
      this.appService.isUserLoggedIn.next(res.tokens.access.token);
      this.registerForm.reset();
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.controls[key].setErrors(null);
      });
      this.router.navigateByUrl('/');
      this.toastr.success(res.message, '');

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');

      }
    });
  }


  ngOnInit(): void {
    this.prepareForm();
    this.p.roll.setValue('user');
    this.p.otp.setValue('1234');

  }

}
