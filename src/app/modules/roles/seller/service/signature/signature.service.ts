import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../../../environments/environment';
import { ToastService } from '../../../../shared/services/toast/toast.service';
@Injectable({
  providedIn: 'root'
})
export class SignatureService {
   private apiUrl = environment.apiUrl; // URL base del backend

  constructor(
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  saveSignature(file: File, password: string): Observable<any> {
    const endpoint = `${this.apiUrl}/signature/save`;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('password', password);

    return this.http.post<string>(endpoint, formData, { responseType: 'text' as 'json' }).pipe(
      tap({
        next: () => this.toastService.showSuccess('Firma subida exitosamente'),
        error: (err) =>
          this.toastService.error('Error al subir la firma: ' + err.message),
      })
    );
  }
    getSignatureStatus(): Observable<any> {
    const endpoint = `${this.apiUrl}/signature/status`;
    
    return this.http.get<any>(endpoint).pipe(
      tap({
        next: (response) => console.log('Estado de firma obtenido:', response),
        error: (err) =>
          this.toastService.error('Error al obtener el estado de la firma: ' + err.message),
      })
    );
  }
}
