import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "../../services/data.service";
import {AppService} from "../app.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {EventModel} from "../../models/event.model";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: EventModel[] = [] ;

  constructor(private restService: DataService,
              public appService: AppService,
              private router: Router,
              private toastr: ToastrService) {
  }

  getEvents() {
    this.restService.getEvents().then((res) => {
      this.events = res.results;
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
    this.getEvents();
  }

}
