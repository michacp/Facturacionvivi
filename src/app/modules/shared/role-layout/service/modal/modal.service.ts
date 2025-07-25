import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewCustomerModalComponent } from '../../modals/new-customer-modal/new-customer-modal.component';
 import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
 private modalResponseSubject = new Subject<any>(); // Subject para emitir datos
  public modalResponse$ = this.modalResponseSubject.asObservable(); // Observable público

  constructor(private dialog: MatDialog) {}

  openNewCustomerModal(): void {
    const dialogRef = this.dialog.open(NewCustomerModalComponent, {
      width: '600px',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.modalResponseSubject.next(result); // Emite los datos al componente padre
      }
    });
  }
}
