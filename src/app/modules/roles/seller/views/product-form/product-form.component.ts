import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
 productoForm!: FormGroup;

  // Datos simulados. Reemplaza por llamadas a tu backend si lo deseas.
  unidades = [
    { _id: '1', nombre: 'Unidad' },
    { _id: '2', nombre: 'Litro' },
    { _id: '3', nombre: 'Kilogramo' }
  ];

  categorias = [
    { _id: 'cat1', nombre: 'Bebidas' },
    { _id: 'cat2', nombre: 'Alimentos' }
  ];

  impuestos = [
    { _id: 'iva12', nombre: 'IVA 12%' },
    { _id: 'iva0', nombre: 'IVA 0%' },
    { _id: 'ice', nombre: 'ICE' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productoForm = this.fb.group({
      codigo_principal: ['', Validators.required],
      codigo_auxiliar: [''],
      tipo_item: ['producto', Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(255)],
      precio_unitario: ['', [Validators.required, Validators.min(0)]],
      id_unidad: ['', Validators.required],
      id_categoria: [''],
      id_impuestos: [[]],
      ice_especifico: [0, [Validators.min(0)]],
      stock: [0, [Validators.min(0)]],
      estado: [true]
    });
  }

  onSubmit(): void {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoData = this.productoForm.value;
    console.log('Producto a guardar:', productoData);

    // Aquí iría tu llamada al servicio para guardar el producto
    // this.productoService.crearProducto(productoData).subscribe(...)
  }
}
