import { Injectable } from '@angular/core';
import { CanActivate, CanMatch, Route, UrlSegment, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanMatch {
  
  constructor(private authService: AuthService, private router: Router) {}

  // Para rutas ya cargadas
  canActivate(): boolean | UrlTree {
    return this.checkAuth();
  }

  // Para módulos lazy-loaded (sustituye a CanLoad)
  canMatch(route: Route, segments: UrlSegment[]): boolean | UrlTree {
    return this.checkAuth();
  }

  private checkAuth(): boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }
}