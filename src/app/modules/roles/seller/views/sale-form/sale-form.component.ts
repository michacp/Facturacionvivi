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
import { formatDate } from '@angular/common';
import { LoadingModalComponent } from '../../../../shared/role-layout/components/loading-modal/loading-modal.component';
import { MatDialog } from '@angular/material/dialog';
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
  last5Sales: SaleList5last[] = []
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
    private salesService: SaleService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.printTicket()
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
    // Verificar que facturaForm existe y es válido
    if (!this.facturaForm || !this.facturaForm.valid) {
      console.warn('Formulario inválido o no inicializado');
      return;
    }

    // Obtener el control de fecha de manera segura
    const fechaControl = this.facturaForm.get('fechaEmision');
    if (!fechaControl || !fechaControl.value) {
      console.warn('Campo fechaEmision no encontrado o sin valor');
      return;
    }

    // Formatear los valores
    const formValue = {
      ...this.facturaForm.value,
      fechaEmision: this.formatDateToLocalString(fechaControl.value)
    };

    this.elemtomonstrar = false;
    const dialogRef = this.dialog.open(LoadingModalComponent, {
      disableClose: true,
      data: {}
    });

    this.salesService.saveSale(formValue).subscribe({
      next: (response: any) => {
        let title = 'Venta guardada exitosamente';
        let message = 'Factura no emitida.';
        let success = true;
        const objeto = JSON.parse(response);

        if (objeto?.FacData) {

          const { estado, mensajeSRI } = objeto.FacData;
          if (estado === 'AUTORIZADO') {
            title = '✅ Factura Autorizada';
            message = `La factura fue autorizada correctamente. Clave de acceso: ${objeto.FacData.claveA}`;
          } else if (estado === "DEVUELTA") {
            title = '⚠️ Factura Devuelta';
            message = mensajeSRI || 'El SRI devolvió la factura.';
            success = false;
          } else if (estado === 'NO AUTORIZADO') {
            title = '❌ Factura No Autorizada';
            message = mensajeSRI || 'El comprobante no fue autorizado.';
            success = false;
          }
        }

        // Mostrar el resultado en el modal
        dialogRef.componentInstance.data.result = {
          title,
          message,
          success,
          ventaId: objeto?.ventaId || null
        };
        this.initFacturaForm(); this.getnewdata(); this.elemtomonstrar = true; this.supplierSearch.reset(); this.Clientes = [];
      },
      error: (error) => {
        console.error('Error al guardar la venta:', error);
        dialogRef.componentInstance.data.result = {
          title: '❌ Error',
          message: 'Ocurrió un error al guardar la venta o enviar al SRI.',
          success: false
        };
      }
    });
  }
  printTicket() {
    this.salesService.printTicketPDF("ss").subscribe({
      next: (pdf) => {

        console.log(pdf)
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }
  loadLast5Sales() {
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

  private formatDateToLocalString(date: Date): string {
    // Usamos el locale 'en-US' pero podrías usar 'es-EC' si prefieres
    return formatDate(date, 'yyyy-MM-dd HH:mm:ss', 'en-US', 'America/Guayaquil');

    /* Alternativa sin usar formatDate:
    const pad = (num: number) => num.toString().padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
           `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    */
  }
  loading: boolean = false
  imprimirVenta(venta: any) {
    // Mostrar animación de carga
    this.loading = true;
    this.salesService.printTicketPDF({ id: venta.saleId }).subscribe({
      next: () => this.loading = false,
      error: (err) => this.loading = false
    });
  }
}
