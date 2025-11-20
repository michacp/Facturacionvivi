import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../service/product/product.service';
import { Brand, Model, Tax, Percentaje, TypeItem } from '../../models/Products.interface';


@Component({
  selector: 'app-edit-product',
  standalone: false,
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  productoForm!: FormGroup;
  lotesForm!: FormArray;
  marcas: Brand[] = [];
  modelos: Model[] = [];
  impuestos: Tax[] = [];
  porcentajes: Percentaje[] = [];
  tipo_item: TypeItem[] = [];
  impuestoControl = new FormControl<number | null>(null);
  showComponents = true;

  constructor(
    private fb: FormBuilder,
    private productservice: ProductService,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.loadInitialData();
  }

  private initializeForm(): void {
    this.lotesForm = this.fb.array([]);

    this.productoForm = this.fb.group({
      id:[this.data.id, Validators.required], 
      nombre: ['', [Validators.required, Validators.maxLength(200)]],
      descripcion: ['', Validators.maxLength(255)],
      precio_unitario: ['', [Validators.required, Validators.min(0)]],
      id_tarifa_impuesto: ['', Validators.required],
      modelos_ids: [[], Validators.required],
      lotes: this.lotesForm   // 👈 nuevo
    });
  }

  /** Carga datos iniciales (listas de marcas, impuestos, etc.) y los datos del producto a editar */
  private loadInitialData(): void {
    this.productservice.getNewData().subscribe({
      next: (data: any) => {
        this.marcas = data.brands; 
        this.impuestos = data.taxes;

        // Luego de cargar catálogos, cargamos el producto
        this.loadProductData();
      },
      error: (err) => console.error('Error cargando catálogos:', err),
    });
  }
  preselectedModels = [];
  /** Carga el producto desde el backend */
  private loadProductData(): void {
    this.productservice.findOneProduct(this.data).subscribe({
      next: (response: any) => {

        const tipoImpuesto = this.impuestos.find(item => item.name === response.tarifa_impuesto.tipo_impuesto.nombre);
        const idTipoImpuesto = tipoImpuesto ? tipoImpuesto.id : null;

        this.impuestoControl.setValue(idTipoImpuesto);
        this.onImpuestoSeleccionado(idTipoImpuesto, response.tarifa_impuesto.tarifa_nombre);

        // Seteamos los valores del formulario
        this.productoForm.patchValue({ 
          nombre: response.item_nombre,
          descripcion: response.item_descripcion,
          precio_unitario: parseFloat(response.item_precio_unitario),
          stock: 0, // Si no viene stock, lo dejas en 0 o puedes agregarlo al backend
          modelos_ids: response.modelos.map((m: any) => m.models_id)
        });
        this.lotesForm.clear();

        // Agregar los lotes recibidos
        response.lotes.forEach((lote: any) => {
          const loteGroup = this.fb.group({
            lote_id: [lote.lote_id, Validators.required],
            numero_lote: [lote.numero_lote, Validators.required],
            cantidad: [lote.cantidad, [Validators.required, Validators.min(0)]],
            fecha_ingreso: [lote.fecha_ingreso]
          });

          this.lotesForm.push(loteGroup);
        });


        this.preselectedModels = response.modelos.map((m: any) => ({
          id: m.models_id,
          name: m.models_name
        }));
        // Si necesitas mostrar los modelos
        this.modelos = this.preselectedModels
      },
      error: (err) => console.error('Error cargando producto:', err),
    });
  }

  /** Al cambiar tipo de impuesto (IVA, ICE, etc.) carga las tarifas disponibles */
  onImpuestoSeleccionado(event: any, porcentajeName?: string): void {
    if (event) {
      this.productservice.findPercentajesData({ id: event }).subscribe({
        next: (response: Percentaje[]) => {
          this.porcentajes = response;

          // Si ya sabemos cuál tarifa usar (por ejemplo 0%)
          const tarifa = porcentajeName
            ? this.porcentajes.find(item => item.name === porcentajeName)
            : this.porcentajes[0];

          const idTarifa = tarifa ? tarifa.id : null;
          this.productoForm.patchValue({ id_tarifa_impuesto: idTarifa });
        },
        error: (err) => console.error('Error cargando porcentajes:', err),
      });
    }
  }

  /** Actualiza selección de modelos */
  updateSelectedModels(selectedIds: number[]): void {
    (this.productoForm.controls['modelos_ids'] as FormControl).setValue(selectedIds);
  }

  /** Guarda los cambios */
  onSubmit() {
    if (this.productoForm.invalid) return;

    const payload = {
      ...this.productoForm.value,
      lotes: this.lotesForm.value   // 👈 incluye los lotes actualizados
    };

    console.log("Payload final:", payload);

    this.productservice.updateProduct(payload).subscribe({
      next: (response: any) => {
        this.dialogRef.close(true);
      },
      error: (err) => console.error('Error fetching models:', err),
    });
  }

  buscarmodelos(data: any): void {
    if (!data) return;

    this.productservice.findModelsData(data).subscribe({
      next: (response: any[]) => {
        this.modelos = response;

        // Si el producto ya tiene modelos seleccionados, los mantenemos marcados
        const modelosSeleccionados = this.productoForm.get('modelos_ids')?.value || [];
        const modelosDisponiblesIds = this.modelos.map(m => m.id);

        // Filtra solo los modelos que aún existen en la respuesta
        const modelosValidos = modelosSeleccionados.filter((id: number) =>
          modelosDisponiblesIds.includes(id)
        );

        this.productoForm.patchValue({ modelos_ids: modelosValidos });
      },
      error: (err) => {
        console.error('Error al buscar modelos:', err);
      }
    });
  }



  cerrar(): void {
    this.dialogRef.close(false);
  }
}
