import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { GenericSelectorComponent } from './components/generic-selector/generic-selector.component'; 
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatAutocomplete, MatOption } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule} from '@angular/material/chips'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { GenericChipsSelectorComponent } from './components/generic-chips-selector/generic-chips-selector.component'; 
import { GenericAutocompleteComponent } from './components/generic-autocomplete/generic-autocomplete.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NewCustomerModalComponent } from './modals/new-customer-modal/new-customer-modal.component';

 

// Angular Material Modules
 
import { MatSelectModule }    from '@angular/material/select';
 
@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    GenericSelectorComponent,
    GenericChipsSelectorComponent, 
    GenericAutocompleteComponent, NewCustomerModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
     MatFormField,
     ReactiveFormsModule,
    MatLabel,
    MatAutocomplete,
    MatOption,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule,
    MatChipsModule,
     MatButton, 
      MatButtonModule,
      MatTooltipModule,
       MatSelectModule
  ],
    exports: [
    SidebarComponent,
    NavbarComponent,
    GenericSelectorComponent,
    GenericChipsSelectorComponent, 
    GenericAutocompleteComponent,
    NewCustomerModalComponent
  ]
})
export class RoleLayoutModule { }
