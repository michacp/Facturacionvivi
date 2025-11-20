import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { InitialData, Model, Percentaje } from '../../models/Products.interface';
import { ToastService } from '../../../../shared/services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl; // Usa la URL base del environment

  constructor(private http: HttpClient, private toastService: ToastService) { }

  // Ejemplo: GET para obtener datos
  findOneProduct(data: any): Observable<InitialData> {
    const endpoint = `${this.apiUrl}/products/findoneproduct`;
    return this.http.post<InitialData>(endpoint, data);
  }
  getNewData(): Observable<InitialData> {
    const endpoint = `${this.apiUrl}/products/getnewdata`;
    return this.http.get<InitialData>(endpoint);
  }
  findPercentajesData(data: any): Observable<Percentaje[]> {
    const endpoint = `${this.apiUrl}/products/findpercentajes`;
    return this.http.post<Percentaje[]>(endpoint, data);
  }
  updateProduct(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/products/editproduct`;
        return this.http.post<string>(endpoint, data, { responseType: 'text' as 'json' }).pipe(
      tap({
        next: () => this.toastService.showSuccess('Item editado exitosamente'),
        error: (err) => this.toastService.error('Error al editar' + err.message)
      })
    );
  }
  findModelsData(data: any): Observable<Model[]> {
    const endpoint = `${this.apiUrl}/products/findmodels`;
    return this.http.post<Model[]>(endpoint, data);
  }


 
}
