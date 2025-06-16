import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProductFormComponent } from './views/product-form/product-form.component';

const routes: Routes = [{ path: '', component: SellerComponent,
  children: [
    { path: 'home', component: DashboardComponent },
    { path: 'new-product', component: ProductFormComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
