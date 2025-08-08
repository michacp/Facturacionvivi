import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RoleLayoutModule } from '../../shared/role-layout/role-layout.module';
import { ProductFormComponent } from './views/product-form/product-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductListComponent } from './views/product-list/product-list.component'; 

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SaleFormComponent } from './views/sale-form/sale-form.component';
 import { MatDialogModule } from '@angular/material/dialog';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SaleListComponent } from './views/sale-list/sale-list.component'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
@NgModule({
  declarations: [
    SellerComponent,
    DashboardComponent,
    ProductFormComponent,
    ProductListComponent,
    SaleFormComponent,
    SaleListComponent,
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
    RoleLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    RouterModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
        MatDatepickerModule,
    MatNativeDateModule,
     MatProgressSpinnerModule 
  ],
})
export class SellerModule { }
