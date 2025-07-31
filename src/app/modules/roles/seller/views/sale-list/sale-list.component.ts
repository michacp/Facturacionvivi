import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SaleService } from '../../service/sale/sale.service';
@Component({
  selector: 'app-sale-list',
  standalone: false,
  templateUrl: './sale-list.component.html',
  styleUrl: './sale-list.component.scss'
})
export class SaleListComponent {
  displayedColumns: string[] = [
    'factura_id',
    'cliente',
    'fecha_emision',
    'tipo_comprobante',
    'forma_pago',
    'total',
    'total_items'
  ];
  dataSource = new MatTableDataSource<any>([]);
  filters = {
    searchQuery: '',
    forma_pago: '',
    pageIndex: 0,
    pageSize: 30
  };
  totalItems = 0;
  itemsPerPage = 30;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private saleservice: SaleService) { }

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas(): void {
    const params = {
      filters: this.filters
    };
    this.saleservice.listSales(params).subscribe({
      next: (res: any) => {
        this.dataSource.data = res.items || res; // Ajusta si tu backend retorna { items, total }
        this.totalItems = res.total || res.length;
      },
      error: (err) => console.error(err)
    });
  }

  onPageChange(event: any): void {
    this.filters.pageIndex = event.pageIndex;
    this.filters.pageSize = event.pageSize;
    this.loadVentas();
  }

  getRowClass(index: number): string {
    return index % 2 === 0 ? 'row-even' : 'row-odd';
  }
}
