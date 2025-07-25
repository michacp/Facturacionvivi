import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { InitialData, Model, Percentaje } from '../../models/Products.interface';
import { ToastService } from '../../../../shared/services/toast/toast.service';
import { TiposIdentificacion, ClientesListSelect } from '../../models/Customer.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl; // Usa la URL base del environment

  constructor(private http: HttpClient, private toastService: ToastService) { }

  // Ejemplo: GET para obtener datos
  getNewData(): Observable<TiposIdentificacion[]> {
    const endpoint = `${this.apiUrl}/clients/getnewdata`;
    return this.http.get<TiposIdentificacion[]>(endpoint);
  }
  save(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/clients/save`;

    return this.http.post<string>(endpoint, data, { responseType: 'text' as 'json' }).pipe(
      tap({
        next: () => this.toastService.showSuccess('Producto guardado exitosamente'),
        error: (err) => this.toastService.error('Error al guardar el producto: ' + err.message)
      })
    );
  }
  findclient(data: any): Observable<ClientesListSelect[]> {
    const endpoint = `${this.apiUrl}/clients/find`;
    return this.http.post<ClientesListSelect[]>(endpoint, data);
  }
}
