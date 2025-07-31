import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,  // Añade esta importación
  FormControl // Opcional: útil para controles dinámicos
} from '@angular/forms';
import { ModalService } from '../../../../shared/role-layout/service/modal/modal.service';
import { Subscription } from 'rxjs';
import { ClientesListSelect } from '../../models/Customer.interface';
import { ClientService } from '../../service/client/client.service';
import { Factura, FormaPago, ImpuestoSales, SaleList5last, TipoComprobante } from '../../models/Sales.interface';
import { ProductosListSelect } from '../../models/Products.interface';
import { ProductService } from '../../service/product/product.service';
import { SaleService } from '../../service/sale/sale.service';
@Component({
  selector: 'app-sale-form',
  standalone: false,
  templateUrl: './sale-form.component.html',
  styleUrl: './sale-form.component.scss'
})
export class SaleFormComponent {
  facturaForm!: FormGroup;
  supplierSearch = new FormControl();
  productSearch = new FormControl();
  elemtomonstrar = true
  Clientes: ClientesListSelect[] = [];
  Productos: ProductosListSelect[] = [];
  impuestos: ImpuestoSales[] = [];
  tipocomprobante: TipoComprobante[] = []
  formadepago: FormaPago[] = []
last5Sales:SaleList5last[]=[]
  private subscription!: Subscription;

  camposTotales = [
    { label: 'Subtotal', control: 'subtotal' },
    { label: 'Descuento Total', control: 'descuentoTotal' },
    { label: 'IVA  ', control: 'iva' },
    { label: 'Propina', control: 'propina' },
    { label: 'Total', control: 'total' }
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private backendservice: ClientService,
    private productService: ProductService,
    private salesService: SaleService
  ) {

  }

  ngOnInit() {
    this.loadLast5Sales()
    this.initFacturaForm()
    this.getnewdata()
    this.subscription = this.modalService.modalResponse$.subscribe(data => {
      this.Clientes = JSON.parse(data.data);
    });

  }
  initFacturaForm(): void {
    this.facturaForm = this.fb.group({
      clienteId: [null, Validators.required],
      fechaEmision: [new Date(), Validators.required],
      tipoComprobante: ['01', Validators.required],
      moneda: ['USD', Validators.required],
      formaPago: ['01', Validators.required],
      plazoPago: [''],
      observaciones: [''],
      productos: this.fb.array([]),
      subtotal: [0],
      descuentoTotal: [0],
      iva: [0],
      propina: [0],
      total: [0]
    });
  }
  getnewdata() {
    this.salesService.getNewData().subscribe({
      next: (data) => {
        this.Clientes = data.clientes;
        this.Productos = data.productos;
        this.impuestos = data.impuestos
        this.tipocomprobante = data.vouchertype
        this.formadepago = data.formapago
        const comprobanteVenta = this.tipocomprobante.find(
          item => item.name.toUpperCase() === 'COMPROBANTE DE VENTA'
        );
        const formaPago = this.formadepago.find(
          item => item.name.toUpperCase() === 'SIN UTILIZACIÓN DEL SISTEMA FINANCIERO'
        );
        this.facturaForm.patchValue({
          tipoComprobante: comprobanteVenta?.id,
          formaPago: formaPago?.id
        });

      },
      error: (err) => console.error(err)
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  get productos() {
    return this.facturaForm.get('productos') as FormArray;
  }

  onSearch(value: any) {
    if (typeof value !== 'object') {
      this.backendservice.findclient({ search: value }).subscribe({
        next: (data) => this.Clientes = data,
        error: (err) => console.error(err)
      });
    }
  }
  onSearchProduct(value: any) {
    if (typeof value !== 'object') {
      this.productService.findProductsIsdName({ search: value }).subscribe({
        next: (data) => this.Productos = data,
        error: (err) => console.error(err)
      });
    }
  }
  addProveedor() {
    this.modalService.openNewCustomerModal();
  }

  onProveedorSeleccionado(cliente: any) {
    this.facturaForm.patchValue({ clienteId: cliente.id });
  }

  onProductoSeleccionado(producto: any) {
    const productoGroup = this.fb.group({
      productoId: [producto.id],
      productoname: [producto.name],
      cantidad: [1, Validators.required],
      precioUnitario: [producto.price, Validators.required], // puedes cambiar el precio base si lo incluyes en el array
      descuento: [0],
      codigoImpuesto: [producto.tax_percentage_id]
    });
    this.productos.push(productoGroup);
    this.calcularTotales();
    this.productSearch.reset();
  }

  eliminarProducto(index: number) {
    this.productos.removeAt(index);
    this.calcularTotales();
  }

  calcularTotales() {
    let subtotal = 0;
    let descuentoTotal = 0;
    let ivaTotal = 0;
    let total = 0;

    this.productos.controls.forEach(control => {
      const cantidad = control.value.cantidad;
      const precio = control.value.precioUnitario;
      const descuento = control.value.descuento || 0;
      const codigoImpuesto = control.value.codigoImpuesto;

      const subtotalLinea = cantidad * precio;
      const valorConDescuento = subtotalLinea - descuento;

      // Buscar el impuesto por ID (asegura comparación correcta)
      const impuesto = this.impuestos.find(i => i.id === codigoImpuesto);
      const porcentaje = impuesto ? parseFloat(impuesto.percentage) : 0;
      const valorIVA = valorConDescuento * (porcentaje / 100);
      subtotal += valorConDescuento;
      ivaTotal += valorIVA;
      descuentoTotal += descuento;
    });

    total = subtotal + ivaTotal;

    this.facturaForm.patchValue({
      subtotal,
      descuentoTotal,
      iva: ivaTotal,
      total
    });
  }



  guardarFactura() {
    if (this.facturaForm.valid) {
      this.elemtomonstrar = false
      this.salesService.saveSale(this.facturaForm.value).subscribe({
        next: () => {
          this.initFacturaForm()
          this.getnewdata()
          this.elemtomonstrar = true
          this.supplierSearch.reset();
          this.Clientes = []
          console.log('Venta guardada correctamente');
          // Puedes resetear el formulario o hacer otras acciones aquí
        },
        error: (error) => {
          // Manejo adicional de errores si es necesario
          console.error('Error al guardar la venta:', error);
        }
      });
      // Aquí iría la llamada al backend
    } else {
      console.warn('Formulario inválido');
    }
  }

  loadLast5Sales(){
   this.salesService.listLast5Sales().subscribe({
    next: (sales) => {
      this.last5Sales = sales;
      console.log(this.last5Sales)
    },
    error: (err) => {
      console.error('Error:', err);
      this.last5Sales = [];
    }
  });
  }
}
