import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {AppService} from "../app.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public restService: DataService, public appService: AppService) {
  }



  ngOnInit(): void {
    window.scroll(0 ,0);
  }
}
