import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('interceptor')
    // Aquí obtienes el token (ejemplo desde localStorage)
    const token = localStorage.getItem('token');
console.log(token)
    let authReq = req;

    if (token) {
      // Clonamos la request para agregarle el header
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Continuar con la request modificada o la original
    return next.handle(authReq);
  }
}
