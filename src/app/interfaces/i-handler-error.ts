import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";

export interface IHandlerError{
    
    handlerError(errorResponse: HttpErrorResponse): Observable<never>;

}

export interface IError {

    name: string;

    message: string;

}
