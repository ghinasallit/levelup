import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../app.service";
import {DataService} from "../../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {ContentModel} from "../../models/content.model";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  content: ContentModel;
  public dummyElem = document.createElement('DIV');

  constructor(public appService: AppService,
              private toastr: ToastrService,
              public restService: DataService) { }


  getContent(type) {
    this.restService.getContent(type).then((res) => {
      this.content = res;
    }).catch((err: HttpErrorResponse) => {
      if (err.status) {
        this.toastr.error(err.error.message);
        if (err.error.code === 401) {
          this.restService.refreshTokenUser();
        }
      }
    });
  }

  decode(text: string): string {
    var ret:string = "";

    this.dummyElem.innerHTML = text;
    document.body.appendChild(this.dummyElem);
    ret = this.dummyElem.textContent; // just grap the decoded string which contains the desired HTML tags
    document.body.removeChild(this.dummyElem);

    return ret;
  }


  ngOnInit(): void {
    this.getContent('1');
  }

}
