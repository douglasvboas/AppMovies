import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private storage: Storage, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('login') || req.url.includes('cadastrar-usuario')) {
      return next.handle(req).pipe(
        catchError(error => this.handleError(error))
      );
    }

    return from(this.storage.get('token')).pipe(
      switchMap(token => {
        const authReq = token
          ? req.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            })
          : req;

        return next.handle(authReq).pipe(
          catchError(error => this.handleError(error))
        );
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Interceptor error:', error);

    if (error.status === 401 || error.status === 403) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('Sessão expirada'));
    }

    if (error.status === 0) {
      return throwError(() => new Error('Erro de conexão'));
    }

    return throwError(() => error);
  }
}
