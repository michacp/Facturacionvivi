import { Component } from '@angular/core';
import { AuthService } from '../../../../public/service/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
constructor(private authService:AuthService){}
 // Método para cerrar sesión
  logout(): void {
    this.authService.logout(); 
  }
 
}
