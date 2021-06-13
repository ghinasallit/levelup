import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {ErrorDialogService} from './error-dialog/errordialog.service';
import {makeStateKey, TransferState} from '@angular/platform-browser';
import {Observable, of, throwError} from 'rxjs';
import {isPlatformServer} from '@angular/common';
import {catchError, map} from 'rxjs/operators';


@Injectable()
export class InterceptorProvider implements HttpInterceptor {

  constructor(public errorDialogService: ErrorDialogService,
              private transferState: TransferState, @Inject(PLATFORM_ID) private platformId) {
  }

  // Intercepts all HTTP requests!
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('auth_token_levelup');
    const language: string = localStorage.getItem('language') || 'en';

    const urlStateKey = makeStateKey(request.url);
    if (this.transferState.hasKey(urlStateKey)) {
      const response: any = this.transferState.get(urlStateKey, {});
      this.transferState.remove(urlStateKey);
      return of(new HttpResponse({
        ...response,
        headers: new HttpHeaders(response.headers)
      }));
    }

    if (token) {
      request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
    }

    if (request.headers.get('Content-Type') === 'multipart/form-data') {
      // For some reason asp.net core responds 415 when there is a content type specified. Weired!!! so I killed it
      request = request.clone({headers: request.headers.delete('Content-Type')});
    }

    if (!request.headers.has('Accept-Language')) {
      request = request.clone({headers: request.headers.set('Accept-Language', language)});
    }

    const CallerConnectionId: string = localStorage.getItem('CallerConnectionId');
    if (CallerConnectionId) {
      request = request.clone({headers: request.headers.set('CallerConnectionId', CallerConnectionId)});
    }

    /*if (navigator.onLine !== undefined) {
        if (navigator.onLine === false) {
            let data = {};
            data = {
                reason: 'No Internet connection found',
                status: 404
            };
            this.errorDialogService.openDialog(data);
            return throwError({
                status: 404,
                message: 'No Internet connection found'
            });
        }
    }*/

    return next.handle(request).pipe(
      map((resp: HttpEvent<any>) => {
        if (isPlatformServer(this.platformId)) {
          this.transferState.set(urlStateKey, resp);
        }
        return resp;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('There was an error', error);
        if (error.status === 500) {
          let data = {};
          data = {
            reason: error && error.error.reason ? error.error.reason : error.message,
            status: error.status
          };
          this.errorDialogService.openDialog(data);
        }
        return throwError(error);
      })
    );

  }

}
