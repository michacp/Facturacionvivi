import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { InitialData, Model, Percentaje } from '../../models/Products.interface';
import { ToastService } from '../../../../shared/services/toast/toast.service';


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = environment.apiUrl; // Usa la URL base del environment

  constructor(private http: HttpClient, private toastService: ToastService) { }

  // Ejemplo: GET para obtener datos
  getNewData(): Observable<any> {
    const endpoint = `${this.apiUrl}/sales/getnewdata`;
    return this.http.get<any>(endpoint);
  }
  findModelsData(data: any): Observable<Model[]> {
    const endpoint = `${this.apiUrl}/products/findmodels`;
    return this.http.post<Model[]>(endpoint, data);
  }
  findPercentajesData(data: any): Observable<Percentaje[]> {
    const endpoint = `${this.apiUrl}/products/findpercentajes`;
    return this.http.post<Percentaje[]>(endpoint, data);
  }
  save(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/products/save`;

    return this.http.post<string>(endpoint, data, { responseType: 'text' as 'json' }).pipe(
      tap({
        next: () => this.toastService.showSuccess('Producto guardado exitosamente'),
        error: (err) => this.toastService.error('Error al guardar el producto: ' + err.message)
      })
    );
  }
  list(data: any): Observable<any[]> {
    const endpoint = `${this.apiUrl}/products/list`;
    return this.http.post<any[]>(endpoint, data);
  }
  last5Saves(): Observable<any[]> {
    const endpoint = `${this.apiUrl}/products/last5saves`;
    return this.http.get<any[]>(endpoint);
  }
  findProductsIsdName(data: any): Observable<any[]> {
    const endpoint = `${this.apiUrl}/products/findproductsidname`;
    return this.http.post<any[]>(endpoint, data);
  }
  saveSale(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/sales/save`;

    return this.http.post<string>(endpoint, data, { responseType: 'text' as 'json' }).pipe(
      tap({
        next: () => this.toastService.showSuccess('Venta guardada exitosamente'),
        error: (err) => this.toastService.error('Error al guardar laventa: ' + err.message)
      })
    );
  }

  listSales(data: any): Observable<any[]> {
    const endpoint = `${this.apiUrl}/sales/list`;
    return this.http.post<any[]>(endpoint, data);
  }
  listLast5Sales(): Observable<any[]> {
    const endpoint = `${this.apiUrl}/sales/get5lastsales`;
    return this.http.get<any[]>(endpoint);
  }
printTicketPDF(data: any): Observable<'ok'> {
  const endpoint = `${this.apiUrl}/sales/ticket-pdf`;

  return new Observable(observer => {
    this.http.post<{ base64: string }>(endpoint, data).subscribe({
      next: (res) => {
        try {
          const base64 = res.base64;
          if (!base64) throw new Error('No se recibió base64 válido');

          // Convertir base64 → PDF → Blob → URL
          const byteCharacters = atob(base64);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });
          const blobUrl = URL.createObjectURL(blob);

          // 🪟 Abrir PDF en nueva pestaña
          const newTab = window.open(blobUrl, '_blank');
          if (!newTab) console.warn('El navegador bloqueó la apertura del PDF');
          else newTab.addEventListener('unload', () => URL.revokeObjectURL(blobUrl));

          // Devolver éxito
          observer.next('ok');
          observer.complete();
        } catch (error) {
          console.error('❌ Error al procesar el PDF:', error);
          observer.error(error);
        }
      },
      error: (err) => {
        console.error('❌ Error al obtener el PDF:', err);
        observer.error(err);
      }
    });
  });
}
}
