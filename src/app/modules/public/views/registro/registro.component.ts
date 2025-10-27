import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
export interface Regimenes {
  name: String;
  id: any;
}
@Component({
  selector: 'app-registro',
  standalone: false,
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})
export class RegistroComponent {
  usuarioForm!: FormGroup;
  regimenes: Regimenes[] = []
  // Simulación de datos que vendrían del backend
  obligadosContabilidad: any[] = [];

  showAgenteRetencion = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    // Cargar datos simulados (esto sería una llamada al backend)


    this.usuarioForm = this.fb.group({
      user_users: ['', Validators.required],
      name_users: ['', Validators.required],
      pass_users: ['', Validators.required],
      pass_users1: ['', Validators.required],
      razonSocial: ['', Validators.required],
      nombreComercial: ['', Validators.required],
      ruc: ['', Validators.required],
      correoelectronico_users: ['', [Validators.required, Validators.email]],
      dirMatriz: ['', Validators.required],
      telefono_users: ['', Validators.required],
      obligadocontabilidad: [false, Validators.required],
      microempresas_users: [false, Validators.required],
      agenteretencion_users: [{ value: '1', disabled: true }]
    });

    this.apiService.registerNewData().subscribe({
      next: (response) => { 
        this.regimenes = response.regimenes;
        const regimenNo = this.regimenes.find(r => r.name === 'NO');
        if (regimenNo) {
          this.usuarioForm.patchValue({
            microempresas_users: regimenNo.id
          });
        }
      },
      error: (error) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }



  toggleAgenteRetencion(event: any) {
    this.showAgenteRetencion = event.checked;
    const control = this.usuarioForm.get('agenteretencion_users');
    if (event.checked) {
      control?.enable();
    } else {
      control?.disable();
    }
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      this.apiService.register(this.usuarioForm.value).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          // Aquí puedes agregar lógica adicional después del registro exitoso
          // Por ejemplo: redireccionar, limpiar el formulario, etc.
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          // El error ya se maneja en el servicio con toastService,
          // pero puedes agregar lógica adicional aquí si es necesario
        }
      });
      console.log('Datos enviados:', this.usuarioForm.value);
    }
  }
}
