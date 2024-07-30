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
            
            return error;
        })
    }

}