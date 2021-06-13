import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {HttpClient, HttpEventType, HttpHeaders, HttpRequest, HttpResponse} from '@angular/common/http';
import {ConfigService} from '../utils/config.service';
require('isomorphic-form-data');

@Injectable()
export abstract class BaseService {
  private progress = new BehaviorSubject('0');
  currentProgress = this.progress.asObservable();
  constructor(public httpClient: HttpClient, public configService: ConfigService) { }

  protected handleError(error: any) {
    // console.log(error);
    /*const applicationError = error.headers.get('Application-Error');

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    let modelStateErrors = '';
    const serverError = error;

    if (!serverError.type) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    console.log(modelStateErrors);
    return Observable.throw(modelStateErrors || 'Server error');*/
  }

  changeMessage(message: string) {
    this.progress.next(message);
  }



  // tslint:disable-next-line:max-line-length
  restRequest(data: any, serverUrl: string, authtoken: string, type: string = 'POST', isJson: boolean = true, fileToUpload: FormData = null): Promise<any> {
    return new Promise((resolver, reject) => {

      const formData = fileToUpload || new FormData();
      if (data) {
        for ( const key in data ) {
          if (data.hasOwnProperty(key)) {
            formData.append(key, data[key]);
          }
        }
        /*try {

          if (type === 'POST') {
            if (data.entryDate == null || data.entryDate !== undefined) {
              console.log(data);
              alert('Stop here' + serverUrl + ' ' + data.entryDate);

              delete data.entryDate;
            }
            if (data.translations) {
              (data.translations as any[]).forEach(elm => {
                if (elm.entryDate == null || elm.entryDate !== undefined) {
                  delete elm.entryDate;
                }
              });
            }
          }

        } catch (error) {
          alert('Delete entry date error');
        } */

      }

      let headers = new HttpHeaders();
      headers = headers.append('Authorization', 'Bearer ' + authtoken);
      headers = headers.append('Content-Type', (isJson ? 'application/json' : 'application/x-www-form-urlencoded'));


      const req = new HttpRequest(type, serverUrl, (data ? JSON.stringify(data) : formData), {
        headers, reportProgress: true, responseType: 'json'
      });


      let percentDone = 0;
      this.httpClient.request(req).subscribe((httpevent: any) => {
          // Via this API, you get access to the raw event stream.
          // Look for upload progress events.
          if (httpevent.type === HttpEventType.UploadProgress) {
            // This is an upload progress event. Compute and show the % done:
            percentDone = Math.round(100 * httpevent.loaded / httpevent.total);
            this.changeMessage(percentDone.toString());
          } else if (httpevent instanceof HttpResponse) {
            resolver(httpevent.body);
            percentDone = 0;
            this.changeMessage(percentDone.toString());
            // console.log('File is completely uploaded!');
          }
        },
        (err: void) => {
          this.handleError(err);
          reject(err);
        },
        () => {
          // completed event - job done after
          percentDone = 0;
          this.changeMessage(percentDone.toString());
        });
    });
  }
}
