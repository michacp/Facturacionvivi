 export interface Factura {
  // Datos del Cliente (seleccionado por ID desde backend)
  clienteId: number;
  
  
  // Datos de la Factura (generados por backend o formulario)
  fechaEmision: string; // Formato 'dd/MM/yyyy'
  tipoComprobante: string; // '01' (Factura), '04' (Nota de Crédito), '05' (Nota de Débito)
  moneda: string; // 'USD' (por defecto)
  formaPago: string; // '01' (Contado), '02' (Crédito), etc.
  plazoPago?: string; // Opcional (ej: "30 días" si formaPago es crédito)
  observaciones?: string;

  // Lista de Productos/Servicios (con IVA y códigos)
  productos: Array<{
    productoId: number ; 
    cantidad: number;
    precioUnitario: number;
    descuento?: number; // Opcional
    iva: number; // 12, 0, o -1 (no aplica)
    codigoImpuesto: string; // '2' (IVA 12%), '0' (IVA 0%), '6' (No aplica) 
  }>;

  // Totales (calculados automáticamente)
  subtotal12: number; // Suma de productos con IVA 12%
  subtotal0: number;  // Suma de productos con IVA 0%
  descuentoTotal: number; // Suma de descuentos
  iva12: number;     // 12% del subtotal12
  propina?: number;  // Opcional
  total: number;     // subtotal12 + subtotal0 + iva12 + propina - descuentoTotal
}
export interface ImpuestoSales{
  id:string;
  name:string;
  percentage:string;
}
export interface TipoComprobante{
  id:string;
  name:string; 
}
export interface FormaPago{
  id:string;
  name:string; 
}