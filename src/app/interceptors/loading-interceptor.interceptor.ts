
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { HandlerError } from '../classes/handler-error';


@Injectable()
export class LoadingInterceptor extends HandlerError implements HttpInterceptor  {
  private countRequest = 0;
  constructor(    
    private loaderService: LoaderService
  ) {
    super();
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const showLoader = request.headers.has('X-Loader') ? request.headers.get('X-Loader') !== 'none': true;
    this.countRequest++;
    //console.log('showLoader', showLoader)
    if(showLoader){      
      this.loaderService.showLoader();
    }
    
    return next.handle(request)
      .pipe(
        catchError(this.handlerError),
        finalize(() => {
          this.countRequest--;
          if (this.countRequest == 0) {
            setTimeout(() => {
              this.loaderService.closeLoader();
            }, 100);            
          }
        })
      );
  }
}