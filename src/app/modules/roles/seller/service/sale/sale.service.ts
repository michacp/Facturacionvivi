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
}
