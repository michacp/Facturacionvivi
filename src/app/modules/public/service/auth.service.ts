import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
export interface UserPayload {
  id: number;
  username: string;
  email: string;
  empresaId: number | null;
  exp?: number;
  iat?: number;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private router: Router) {}

  // Obtener token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Verificar si el token existe y es válido
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    return this.isTokenValid(token);
  }

  // Validar token (expiración y estructura)
  isTokenValid(token: string): boolean {
    try {
      const decoded: any = jwtDecode(token);
      const currentTime = Date.now() / 1000;
       
      // Verificar que el token no haya expirado
      if (decoded.exp && decoded.exp < currentTime) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token inválido:', error);
      this.logout();
      return false;
    }
  }

  // Obtener el payload decodificado del token
  getDecodedToken(): UserPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<UserPayload>(token);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }

  // Obtener username específico
  getUsername(): string | null {
    const payload = this.getDecodedToken();
    return payload?.username || null;
  }

  // Obtener ID de usuario
  getUserId(): number | null {
    const payload = this.getDecodedToken();
    return payload?.id || null;
  }

  // Obtener email
  getEmail(): string | null {
    const payload = this.getDecodedToken();
    return payload?.email || null;
  }

  // Obtener ID de empresa
  getEmpresaId(): number | null {
    const payload = this.getDecodedToken();
    return payload?.empresaId || null;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  // Guardar token
  setToken(token: string): void {
     console.log('ssdad',token);
    localStorage.setItem('token', token);
  }

  // Redirigir a home si está autenticado
  redirectIfAuthenticated(): void {
    if (this.isAuthenticated()) {
      this.router.navigate(['/seller/home']);
    }
  }
}
