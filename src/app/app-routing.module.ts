import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/public/guards/auth.guard';
const routes: Routes = [
  { path: 'seller', loadChildren: () => import('./modules/roles/seller/seller.module').then(m => m.SellerModule),
    canMatch: [AuthGuard],     
    canActivate: [AuthGuard]   
    },
  { path: '', loadChildren: () => import('./modules/public/public.module').then(m => m.PublicModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
