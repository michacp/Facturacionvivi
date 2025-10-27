import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ToastService } from '../../../modules/shared/services/toast/toast.service';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient, private toastService: ToastService) { }
  private apiUrl = environment.apiUrl;


  register(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/register`;

    return this.http.post<string>(endpoint, data, { responseType: 'text' as 'json' }).pipe(
      tap({
        next: () => this.toastService.showSuccess('Producto guardado exitosamente'),
        error: (err) => this.toastService.error('Error al guardar el producto: ' + err.message)
      })
    );
  }
  registerNewData(): Observable<any> {
    const endpoint = `${this.apiUrl}/registernewdata`;
    return this.http.get<any>(endpoint);
  }
  login(data: any): Observable<any> {
    const endpoint = `${this.apiUrl}/login`;

    return this.http.post<any>(endpoint, data).pipe(
      tap({
        next: (response) => {
          this.toastService.showSuccess('Bienvenido');
          console.log('JSON recibido:', response);
        },
        error: (err) => this.toastService.error('Error: ' + err.message)
      })
    );
  }
}
