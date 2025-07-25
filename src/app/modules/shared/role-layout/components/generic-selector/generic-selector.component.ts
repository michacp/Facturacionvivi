import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';

@Component({
  selector: 'app-generic-selector',
  standalone: false,
  templateUrl: './generic-selector.component.html',
  styleUrl: './generic-selector.component.scss'
})
export class GenericSelectorComponent {
 @Input() label: string = 'Seleccione una opción';
  @Input() placeholder: string = 'Buscar...';
  @Input() options: { id: number; name: string }[] = [];
  @Input() icon: string = '';
  @Input() controlName?: string;
  @Output() optionSelected = new EventEmitter<{ id: number; name: string } | null>();

  filteredOptions: { id: number; name: string }[] = [];
  formControl!: FormControl;

  constructor(private formGroupDirective: FormGroupDirective) {}

  ngOnInit() {
    const parentForm = this.formGroupDirective.form as FormGroup;
    if (this.controlName) {
      this.formControl = parentForm.get(this.controlName) as FormControl;
    } else {
      this.formControl = new FormControl('');
    }

    this.formControl.valueChanges.subscribe(value => {
      if (typeof value === 'string') {
        this.filteredOptions = this.filterOptions(value);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && changes['options'].currentValue) {
      this.filteredOptions = [...this.options];
    }
  }

  private filterOptions(value: string | { id: number; name: string }): { id: number; name: string }[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value?.name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(option: { id: number; name: string } | null): string {
    return option ? option.name : '';
  }

  clearField() {
    this.formControl.setValue('');
    this.optionSelected.emit(null); // Solo emitimos un valor cuando se borra
  }

  onInputFocus() {
    if (this.filteredOptions.length === 0) {
      this.filteredOptions = [...this.options];
    }
  }

  onSelectOption(event: MatOptionSelectionChange, option: { id: number; name: string }) {
    if (event.isUserInput) {
      this.optionSelected.emit(option); // Solo emitimos si el usuario seleccionó manualmente
    }
  }
}
