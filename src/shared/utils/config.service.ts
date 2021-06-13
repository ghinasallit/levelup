import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable()
export class ConfigService {

  // tslint:disable-next-line:variable-name
  _apiURI: string;

  constructor() {
    this._apiURI = environment.apiURI;
  }

  getApiURI() {
    return this._apiURI;
  }
}
