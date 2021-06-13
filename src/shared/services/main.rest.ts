import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../utils/config.service';
import {BaseService} from './base.service';

@Injectable({
  providedIn: 'root'
})
export class MainRestService extends BaseService {
  baseUrl = '';
  progressCount = 0;

  constructor(public configService: ConfigService, public httpClient: HttpClient, private ngZone: NgZone) {
    super(httpClient, configService);

    this.baseUrl = configService.getApiURI();

    this.currentProgress.subscribe((progress: string) => {
      this.ngZone.run(() => {
        this.progressCount = Number(progress);
      });
    });
  }

  /*** PUT Requests **/

  exampleOfPutRequest(id: number, type = 'PUT') {
    return this.restRequest(null, `${this.baseUrl}/api/callAnyAPI`, null, type);
  }

  /*** POST Requests **/

  exampleOfPostRequest(model: any, type = 'POST') {
    return this.restRequest(model, `${this.baseUrl}/api/callAnyAPI`, null, type);
  }


  /*** Get Requests **/

  exampleOfGetRequest(id: number, type = 'GET') {
    return this.restRequest(null, `${this.baseUrl}/api/callAnyAPI`, null, type);
  }
}

