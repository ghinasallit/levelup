import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../models/user.model';
import {HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {DataService} from '../../../services/data.service';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,
              private toastr: ToastrService,
              private restService: DataService,
              private router: Router,
              private appService: AppService) {
  }


  get f() {
    return this.loginForm.controls;
  }

  login() {
    const userModel: UserModel = this.loginForm.value as UserModel;
    this.restService.login(userModel).then((res) => {
      localStorage.setItem('auth_token_levelup', res.tokens.access.token);
      this.appService.isUserLoggedIn.next(res.tokens.access.token);
      localStorage.setItem('refresh_token', res.tokens.refresh.token);
      localStorage.setItem('name', res.user.first_name);
      this.appService.name.next(res.user.first_name);
      let url = localStorage.getItem('url') ? localStorage.getItem('url') : '';
      if (url) {
        this.router.navigateByUrl(url);
        localStorage.removeItem('url');

      } else {
        this.router.navigateByUrl('/');

      }
      // this.appService.isUserLoggedIn.next(res.tokens.access.token);

    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message, '');
      }
    });
  }

  prepareForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    });
  }

  ngOnInit(): void {
    this.prepareForm();
  }

}
