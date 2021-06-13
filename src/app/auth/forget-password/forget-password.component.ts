import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {UserModel} from '../../../models/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataService} from '../../../services/data.service';
import {AppService} from '../../app.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm: FormGroup;

  lang: string;

  constructor(private fb: FormBuilder,
              private restService: DataService,
              private appService: AppService,
              private toastr: ToastrService,
              private router: Router) {
  }


  get f() {
    return this.forgetForm.controls;
  }

  onSubmit() {
    // tslint:disable-next-line:prefer-const
    let userModel: UserModel = this.forgetForm.value as UserModel;
    this.restService.forgetPassword(userModel).then((res) => {
      localStorage.setItem('phone' , userModel.phone);
      this.toastr.success(res.message, '');
      this.router.navigateByUrl('/auth/reset-password');

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }


  prepareForm() {
    this.forgetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      type: ['', Validators.required],

    });
  }

  ngOnInit() {
    window.scroll(0, 0);

    this.prepareForm();
    this.lang = this.appService.currentLanguage === 'en' ? 'ltr' : 'rtl';
    this.f.type.setValue(1);

  }


}
