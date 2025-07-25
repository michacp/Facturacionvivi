import { Component } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../service/product/product.service';
import { Brand, InitialData, Tax, Model, TypeItem, Percentaje, ProductoList } from '../../models/Products.interface';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-product-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  productoForm!: FormGroup;
  impuestoControl = new FormControl<number | null>(null);
  marcas: Brand[] = [];
  impuestos: Tax[] = [];
  modelos: Model[] = [];
  tipo_item: TypeItem[] = [];
  porcentajes: Percentaje[] = []
  Ivaselecion: any
  showComponents = true;
  constructor(private fb: FormBuilder, private pductservice: ProductService) { }
  items: any[] = [];
  ngOnInit(): void {
    this.getnewdata()
    this.last5itemssave();
    this.initializeForm();
  }
  last5itemssave() {
    this.pductservice.last5Saves().subscribe({
      next: (data: any) => {
        this.ultimosProductos = data;
        console.log(data)
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
  getnewdata() {
    this.pductservice.getNewData().subscribe({
      next: (data: InitialData) => {
        this.impuestos = data.taxes;
        this.marcas = data.brands;
        this.tipo_item = data.type;

        // Mover estas operaciones dentro del callback next
        const impuestoIVA = this.impuestos.find(item => item.name === "IVA");
        this.Ivaselecion = impuestoIVA ? impuestoIVA.id : null;

        const tipoProducto = this.tipo_item.find(item => item.name === "Producto");
        const idTipoProducto = tipoProducto ? tipoProducto.id : null;
        this.impuestoControl.setValue(this.Ivaselecion);
        this.onImpuestoSeleccionado(this.Ivaselecion);
        this.productoForm.patchValue({
          tipo_item: idTipoProducto
        });


      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }
  private initializeForm(): void {
    this.productoForm = this.fb.group({
      tipo_item: [null, Validators.required],
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', Validators.maxLength(255)],
      precio_unitario: ['', [Validators.required, Validators.min(0)]],
      id_tarifa_impuesto: ['', Validators.required],
      stock: [0, [Validators.min(0)]],
      modelos_ids: [[], Validators.required]
    });
  }
  onSubmit(): void {
    if (this.productoForm.invalid) {

      this.productoForm.markAllAsTouched();
      return;
    }
    this.showComponents = false;
    this.pductservice.save(this.productoForm.value).subscribe({
      next: (response: any) => {
        this.showComponents = true;
        console.log(response)
        this.getnewdata()
        this.last5itemssave();
        this.initializeForm();

      },
      error: (err) => console.error('Error fetching models:', err),
    });
  }

  buscarmodelos(data: any) {
    this.pductservice.findModelsData(data).subscribe({
      next: (response: Model[]) => {
        this.modelos = response;
      },
      error: (err) => console.error('Error fetching models:', err),
    });
  }
  onImpuestoSeleccionado(event: any) {
    if (event) {
      this.pductservice.findPercentajesData({ id: event }).subscribe({
        next: (response: Percentaje[]) => {
          this.porcentajes = response;
          const impuesto0 = this.porcentajes.find(item => item.name === "0%");
          const impuesto0selecion = impuesto0 ? impuesto0.id : null;
          this.productoForm.patchValue({
            id_tarifa_impuesto: impuesto0selecion
          });
        },
        error: (err) => console.error('Error fetching models:', err),
      });
    }
  }
  updateSelectedModels(selectedIds: number[]) {
    (this.productoForm.controls['modelos_ids'] as FormControl).setValue(selectedIds);
  }

  ultimosProductos: ProductoList[] = [
  ];
}
