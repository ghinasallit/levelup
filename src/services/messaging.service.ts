import {Injectable} from '@angular/core';
import {AngularFireMessaging} from '@angular/fire/messaging';
import {BehaviorSubject} from 'rxjs';
import {HttpErrorResponse} from "@angular/common/http";
import {DataService} from "./data.service";
import {Paginations} from "../models/paginations";

@Injectable()
export class MessagingService {
  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging,
              private restService: DataService) {

    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
        _messaging.usePublicVapidKey('BEssb2tSF2sOd-eL1Qzbrr7Xnj39qZBbrRSX6l9ChFdbK_l3NVz_ajtXiA6N7-oY52Tm9-AYLYgctbQEK8izNr0');
      }
    );
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);
        const pagination = new Paginations();
        pagination.fcm = token;
        this.restService.updateFCM(pagination).then((res) => {
        }).catch((err: HttpErrorResponse) => {
        });
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        // console.log('new message received. ', payload);
        this.currentMessage.next(payload);
      });
  }

}
