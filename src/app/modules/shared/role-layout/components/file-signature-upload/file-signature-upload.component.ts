import { Component } from '@angular/core';
import { SignatureService } from '../../../../roles/seller/service/signature/signature.service';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-file-signature-upload',
  standalone: false,
  templateUrl: './file-signature-upload.component.html',
  styleUrl: './file-signature-upload.component.scss'
})
export class FileSignatureUploadComponent {
  selectedFile: File | null = null;
  password: string = '';
  isDragging: boolean = false;

  constructor(
    private signatureService: SignatureService,
    private dialogRef: MatDialogRef<FileSignatureUploadComponent> // 👈 referencia al modal
  ) {}

  // Drag events
  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // Cerrar con cancelar
  onCancel() {
    this.dialogRef.close('cancelado'); // 👈 envía un valor al padre
  }

  // Subir firma
  onUpload() {
    if (this.selectedFile && this.password) {
      this.signatureService.saveSignature(this.selectedFile, this.password).subscribe({
        next: (res) => {
          console.log('Respuesta backend:', res);
          this.dialogRef.close('guardado'); // 👈 cierra el modal enviando "guardado"
        },
        error: (err) => {
          console.error('Error al subir la firma', err);
        }
      });
    }
  }
}
