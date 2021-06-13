import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import {ToastrService} from "ngx-toastr";
import {ContactModel} from "../../models/contact.model";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder,
              private restService: DataService,
              private toastr: ToastrService
              ) { }

  get f() {
    return this.contactForm.controls;
  }

  prepareForm() {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      details: ['', Validators.required],
      name: ['', Validators.required],
    });

  }

  contcatus() {
    const contact: ContactModel = this.contactForm.value as ContactModel
    this.restService.contactus(contact).then((res) => {
      this.toastr.success(res.message , '');
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
    this.prepareForm();
  }


}
