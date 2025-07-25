import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../roles/seller/service/client/client.service';
import { TiposIdentificacion } from '../../../../roles/seller/models/Customer.interface';
@Component({
  selector: 'app-new-customer-modal',
  standalone: false,
  templateUrl: './new-customer-modal.component.html',
  styleUrl: './new-customer-modal.component.scss'
})
export class NewCustomerModalComponent {
  clienteForm!: FormGroup;
  constructor(public dialogRef: MatDialogRef<NewCustomerModalComponent>, private fb: FormBuilder, private backendcustomer: ClientService) { }
  tiposIdentificacion: TiposIdentificacion[] = [];

  ngOnInit(): void {
    this.backendcustomer.getNewData().subscribe({
      next: (data) => {
        this.tiposIdentificacion = data
        console.log('Datos iniciales recibidos:', data);
        // Aquí puedes usar los datos recibidos para inicializar el formulario si es necesario
      },
      error: (error) => {
        console.error('Error al obtener datos iniciales:', error);
      }
    })
    this.clienteForm = this.fb.group({
      identificacion: ['', Validators.required],
      tipoIdentificacion: ['', Validators.required],
      razonSocial: ['', Validators.required],
      direccion: [''],
      email: ['', Validators.email],
      telefono: [''],
    });
  }



  onSubmit(): void {
    if (this.clienteForm.valid) {
      console.log('Datos a guardar:', this.clienteForm.value);
      this.backendcustomer.save(this.clienteForm.value).subscribe({
        next: (response) => {
          // Cierra el modal y envía los datos del backend al componente padre
          this.cerrarConRespuesta({
            success: true,
            data: response  // Envía toda la respuesta del backend
          });
        },
        error: (error) => {
          // Error - El toast de error ya se muestra en el servicio
          console.error('Error en la operación:', error);
          // Puedes añadir más manejo de errores aquí si necesitas
        }
      });
    } else {
      this.clienteForm.markAllAsTouched();
      console.log('Formulario inválido. Por favor, corrige los errores.');
    }
  }
  cerrarModal() {
    this.dialogRef.close(); // Cierra sin retornar datos
  }

  cerrarConRespuesta(respuesta: any) {
    this.dialogRef.close(respuesta); // Cierra y retorna datos
  }
}
