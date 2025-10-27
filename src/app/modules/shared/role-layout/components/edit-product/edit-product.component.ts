import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../service/product/product.service';
 

@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, // Aquí recibes el data
private productservice:ProductService
  ) {
    this.productservice.findOneProduct(this.data)
    console.log('Datos recibidos:', this.data);
  }
  ngOnInit() {
  this.productservice.findOneProduct(this.data).subscribe({
      next: (response: any) => {
  console.log(response)
      },
      error: (err) => { 
        console.error('Error:', err);
      }
    });
}
  cerrar(): void {
    this.dialogRef.close(); // Cierra el modal
  }
}
