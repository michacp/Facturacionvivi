export interface Brand {
  id: number;
  name: string; 
}
export interface Tax {
  id: number;
  name: string; 
}
export interface Model {
  id: number;
  name: string; 
}
export interface TypeItem {
  id: number;
  name: string; 
}
export interface Percentaje {
  id: number;
  name: string; 
}
export interface InitialData {
  brands: Brand[];
  taxes: Tax[]; 
  type:TypeItem [];
}
export interface ProductoList {
  id: number;
  nombre: string;
  codigo: string;
  precio: string;  
  stock: string;   
  tipo_nombre: string;
  impuesto_nombre: string;
  impuesto_tipo_nombre: string;
  modelos: string; 
  marcas:string; 
}
export interface ProductosListSelect {
  id: number;
  name: string; 
  
}