import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaleService } from '../../../../roles/seller/service/sale/sale.service';
@Component({
  selector: 'app-loading-modal',
  standalone: false,
  templateUrl: './loading-modal.component.html',
  styleUrl: './loading-modal.component.scss'
})
export class LoadingModalComponent {
  loadingPDF = false; // 🔹 Para mostrar animación y bloquear botones

  constructor(
    public dialogRef: MatDialogRef<LoadingModalComponent>,
    public backend: SaleService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  close() {
    if (!this.loadingPDF) {
      this.dialogRef.close();
    }
  }

  imprimir() {
    if (!this.data.result?.ventaId) return;

    console.log('Imprimir venta con ID:', this.data.result.ventaId);
    this.loadingPDF = true; // 🔹 Activamos la animación

    this.backend.printTicketPDF({ id: this.data.result.ventaId }).subscribe({
      next: () => this.loadingPDF = false,
      error: (err) => this.loadingPDF = false

    });
  }
}
