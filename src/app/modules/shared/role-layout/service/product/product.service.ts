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
  findOneProduct(data:any): Observable<InitialData> {
    const endpoint = `${this.apiUrl}/products/findoneproduct`;
    return this.http.post<InitialData>(endpoint,data);
  }
}
