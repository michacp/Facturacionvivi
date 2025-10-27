import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { AuthService } from '../../service/auth.service';
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService,private authService: AuthService) {
    this.loginForm = this.fb.group({
      usernameOrEmail: ['', Validators.required],  // Usuario o Correo
      password: ['', Validators.required],
      rememberMe: [false]  // Checkbox
    });
  }
  ngOnInit(): void {
    // Verificar si ya hay un token válido al cargar el componente
    this.authService.redirectIfAuthenticated();
  }

  onSubmit() {
    if (this.loginForm.valid) { 
      this.loading = true;
      this.errorMessage = '';
      
      this.apiService.login(this.loginForm.value).subscribe({
        next: (response: any) => {       
        
          
          // Guardar el token en el servicio y localStorage
          if (response.token) {
            this.authService.setToken(response.token);
             console.log(response);
            // Redirigir a seller/home después de login exitoso
             this.authService.redirectIfAuthenticated();
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Credenciales incorrectas. Por favor, intente nuevamente.';
          console.error('Error en login:', error);
        },
        complete: () => {
          this.loading = false;
        }
      });
    }
  }
}
