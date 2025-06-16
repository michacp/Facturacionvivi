import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerComponent } from './seller.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { RoleLayoutModule } from '../../shared/role-layout/role-layout.module';
import { ProductFormComponent } from './views/product-form/product-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 


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
     FormsModule
  ]
})
export class SellerModule { }
