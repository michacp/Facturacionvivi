import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { LoginComponent } from './views/login/login.component';
import { RegistroComponent } from './views/registro/registro.component';

import { NoAuthGuard } from './guards/no-auth.guard';
const routes: Routes = [
  {
    path: '', component: PublicComponent,
    children: [
      {
        path: 'login', component: LoginComponent,
        canActivate: [NoAuthGuard]
      },
      { path: 'register', component: RegistroComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
