import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FileSignatureUploadComponent } from '../../../../shared/role-layout/components/file-signature-upload/file-signature-upload.component';
import { SignatureService } from '../../service/signature/signature.service';

@Component({
  selector: 'app-signature',
  standalone: false,
  templateUrl: './signature.component.html',
  styleUrl: './signature.component.scss'
})
export class SignatureComponent {
  constructor(private dialog: MatDialog, private signatureService: SignatureService) { }


  signatureStatus: any;
  loading: boolean = true; // 👈 estado de carga

  ngOnInit(): void {
    this.loadSignatureStatus();
  }

  loadSignatureStatus(): void {
    this.loading = true; // 👈 iniciar carga
    this.signatureService.getSignatureStatus().subscribe({
      next: (status) => {
        this.signatureStatus = status;
        this.loading = false; // 👈 terminó de cargar
      },
      error: (error) => {
        console.error('Error:', error);
        this.loading = false;
      }
    });
  }

  abrirModal(): void {
    const dialogRef = this.dialog.open(FileSignatureUploadComponent, {
      width: '400px', 
    });

    dialogRef.afterClosed().subscribe(result => { 
       if (result === 'guardado') {
        this.loadSignatureStatus(); // 👈 recargar estado si se subió una firma
      }
    });
  }

  getDiasRestantes(): number | null {
    if (!this.signatureStatus?.expiration_date) return null;

    const hoy = new Date();
    const expiracion = new Date(this.signatureStatus.expiration_date);

    // Diferencia en milisegundos
    const diffMs = expiracion.getTime() - hoy.getTime();

    // Convertir a días
    return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  }


}
