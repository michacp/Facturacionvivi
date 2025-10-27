import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module'; 
import { PublicComponent } from './public.component';
import { LoginComponent } from './views/login/login.component';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';   // opcional, si usas <mat-card>
import { MatToolbarModule } from '@angular/material/toolbar'; // opcional si usas toolbars
import { MatSnackBarModule } from '@angular/material/snack-bar'; // opcional para notificaciones
import { MatSelectModule } from '@angular/material/select';

import { ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './views/registro/registro.component'; 
import { MatCheckbox } from '@angular/material/checkbox';
@NgModule({
  declarations: [ 
    PublicComponent,
    LoginComponent,
    RegistroComponent, 
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
        // Material
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatCheckbox,
    ReactiveFormsModule,
    MatSelectModule,
     MatSelectModule,
  ]
})
export class PublicModule { }
