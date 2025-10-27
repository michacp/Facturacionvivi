import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerComponent } from './seller.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ProductFormComponent } from './views/product-form/product-form.component';
import { ProductListComponent } from './views/product-list/product-list.component';
import { SaleFormComponent } from './views/sale-form/sale-form.component';
import { SaleListComponent } from './views/sale-list/sale-list.component';
import { AuthGuard } from '../../public/guards/auth.guard'; 
import { SignatureComponent } from './views/signature/signature.component';
const routes: Routes = [{ path: '', component: SellerComponent,
   
  children: [
    { path: 'home', component: DashboardComponent },
    { path: 'new-product', component: ProductFormComponent },
    { path: 'list-product', component: ProductListComponent },
    { path: 'new-sale', component: SaleFormComponent},
    { path: 'list-sale', component: SaleListComponent},
    { path: 'signature', component: SignatureComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
 }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
