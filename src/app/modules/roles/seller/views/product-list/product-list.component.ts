import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ProductService } from '../../service/product/product.service';
import { ProductoList,TypeItem } from '../../models/Products.interface';
 
@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
displayedColumns: string[] = [
  'codigo',
  'nombre',
  'precio',
  'stock',
  'tipo_nombre',
  'impuesto_nombre',
  'impuesto_tipo_nombre',
  'marcas',
  'modelos'
];
 

  products:ProductoList[]=[]

  categories: TypeItem[] = [];
  constructor(private backend: ProductService) { }
 

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
searchText: string = '';
selectedCategory: number | string = '';
itemsPerPage: number = 30;
currentPage: number = 0;
 totalItems: number = 0;
filteredProducts = new MatTableDataSource<ProductoList>();
  ngOnInit(): void {
 this.applyFilters();
 
  }

 previousSearch = '';

onKeyup(event: KeyboardEvent): void {
  const current = this.searchText.trim();
  // Si estaba vacío y ahora se limpió a vacío otra vez, aplica filtros
  if (!current && this.previousSearch) {
    this.previousSearch = '';
    this.applyFilters();
  }
  // Guarda la última búsqueda con contenido
  if (current) {
    this.previousSearch = current;
  }
}

applyFilters(): void {
  const params = {
    search: this.searchText,
    category: this.selectedCategory,
    page: this.currentPage  , 
    limit: this.itemsPerPage,
  };

  this.backend.list(params).subscribe({
    next: (response: any) => {
      this.products = response.items.items ;  
      this.totalItems = response.items.total;
      this.categories= response.categories
      this.filteredProducts.data = this.products;
    },
    error: (err) => console.error('Error fetching filtered data:', err),
  });
}
 
  onPageChange(event: PageEvent): void {
  this.itemsPerPage = event.pageSize;
  this.currentPage = event.pageIndex;
  this.applyFilters();
}



}
