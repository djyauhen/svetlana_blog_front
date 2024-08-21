import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {LoaderService} from "../shared/services/loader.service";
import {catchError, finalize, throwError} from "rxjs";

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  loaderService.show();

  return next(req).pipe(
    catchError((error: any) => {
      return throwError(error);
    }),
    finalize(() => loaderService.hide())
  );
};
