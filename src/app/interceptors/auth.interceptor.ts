// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(Storage);
  const router = inject(Router);

  if (req.url.includes('login') || req.url.includes('cadastrar-usuario')) {
    return next(req).pipe(
      catchError(error => handleError(error, router))
    );
  }

  return from(storage.get('token')).pipe(
    switchMap(token => {
      console.log('Token armazenado:', token);

      const authReq = token
        ? req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
        : req;

      return next(authReq).pipe(
        catchError(error => handleError(error, router))
      );
    })
  );
};

function handleError(error: any, router: Router) {
  console.error('Interceptor error:', error);

  if (error.status === 401 || error.status === 403) {
    router.navigate(['/login']);
    return throwError(() => new Error('Sessão expirada'));
  }

  if (error.status === 0) {
    return throwError(() => new Error('Erro de conexão'));
  }

  return throwError(() => error);
}