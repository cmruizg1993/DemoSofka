import { Observable, throwError } from "rxjs";
import { IError, IHandlerError } from "../interfaces/i-handler-error";
import { HttpErrorResponse } from "@angular/common/http";

export class HandlerError implements IHandlerError{
    
    handlerError(errorResponse: HttpErrorResponse): Observable<never> {
        console.log('Ocurrió un error: ', errorResponse);
        return throwError(()=>{
            const error: IError ={
                name: errorResponse.name,
                message: errorResponse.message
            }
            if(!!errorResponse.error?.name)
                error.name = errorResponse.error.name;
            if(!!errorResponse.error?.message)
                error.message = errorResponse.error.message;
            if(!!errorResponse.error?.stack)
                error.stack = errorResponse.error.stack;
            return error;
        })
    }

}