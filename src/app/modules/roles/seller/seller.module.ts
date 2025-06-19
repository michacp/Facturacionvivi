import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
    SellerComponent,
    DashboardComponent,
    ProductFormComponent, 
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
    MatCardModule
  ]
})
export class SellerModule { }
