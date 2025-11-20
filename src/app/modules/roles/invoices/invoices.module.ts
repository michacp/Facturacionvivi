import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { InvoiceListComponent } from './views/invoice-list/invoice-list.component';
import { RoleLayoutModule } from '../../shared/role-layout/role-layout.module';


@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceListComponent
  ],
  imports: [
    CommonModule,
    InvoicesRoutingModule, RoleLayoutModule
  ],
    exports: [ InvoiceListComponent]
})
export class InvoicesModule { }
