import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceListComponent } from './views/invoice-list/invoice-list.component';
import { InvoicesComponent } from './invoices.component';

const routes: Routes = [{ path: '', component: InvoicesComponent,
   
  children: [
    { path: 'list', component: InvoiceListComponent },
 
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
