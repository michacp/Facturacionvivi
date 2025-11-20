import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-generic-chips-selector',
  standalone: false,
  templateUrl: './generic-chips-selector.component.html',
  styleUrl: './generic-chips-selector.component.scss'
})
export class GenericChipsSelectorComponent {
  @Input() label: string = 'Elementos seleccionados';
  @Input() availableItems: { id: number; name: string }[] = [];
  @Output() selectionChange = new EventEmitter<number[]>(); // 🔹 Emitir solo IDs
  @Input() preselectedItems: { id: number; name: string }[] = [];

  selectedItems: { id: number; name: string }[] = [];
  filterControl = new FormControl('');
  filteredItems$!: Observable<{ id: number; name: string }[]>;

  @ViewChild('filterInput', { static: false }) filterInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    this.setupFilter();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['availableItems'] || changes['preselectedItems']) {
      this.setupFilter();

      if (this.preselectedItems?.length) {
        // Mapeamos los datos entrantes al formato que usa el componente
        this.selectedItems = this.preselectedItems.map(item => ({
          id: item.id,
          name: item.name
        }));

        // Emitimos los IDs seleccionados para mantener sincronizado el formulario del padre
        this.selectionChange.emit(this.selectedItems.map(item => item.id));
      }
    }
  }
  setupFilter() {
    this.filteredItems$ = this.filterControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterItems(value))
    );
  }

  filterItems(value: string | null): { id: number; name: string }[] {
    const filterValue = String(value || '').toLowerCase(); // 
    return this.availableItems.filter(item =>
      item.name.toLowerCase().includes(filterValue) &&
      !this.selectedItems.some(selected => selected.id === item.id)
    );
  }

  selectItem(event: any) {
    const selectedItem = event.option.value;
    if (!this.selectedItems.find(i => i.id === selectedItem.id)) {
      this.selectedItems.push(selectedItem);
      this.selectionChange.emit(this.selectedItems.map(item => item.id));
    }

    // 🔹 Limpiar manualmente el input después de seleccionar
    this.filterControl.setValue('', { emitEvent: false });
    this.filterInput.nativeElement.value = ''; // 🔹 Esto borra visualmente el texto
    this.filterControl.updateValueAndValidity(); // 🔹 Forzar actualización

    // 🔹 Restablecer el filtro para mostrar todas las opciones disponibles
    this.setupFilter();

    // 🔹 Asegurar que el input reciba el foco nuevamente
    setTimeout(() => this.filterInput?.nativeElement.focus(), 0);
  }

  removeItem(item: { id: number; name: string }) {
    this.selectedItems = this.selectedItems.filter(i => i.id !== item.id);
    this.selectionChange.emit(this.selectedItems.map(item => item.id));

    // 🔹 Forzar actualización del filtro después de eliminar
    this.filterControl.setValue(this.filterControl.value, { emitEvent: true });
  }

  resetFilter() {
    this.filterControl.setValue('');
    this.setupFilter();

    // 🔹 Asegurar que el input reciba el foco nuevamente
    setTimeout(() => this.filterInput?.nativeElement.focus(), 0);
  }

  getColor(index: number): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Naranja pastel
      '#FFFFBA', // Amarillo pastel
      '#Baffc9', // Verde menta
      '#BAE1FF', // Azul cielo
      '#D7BDE2', // Lila
      '#F5B7B1', // Coral suave
      '#AED6F1', // Azul claro
      '#A3E4D7', // Verde agua
      '#F9E79F'  // Amarillo durazno
    ];
    return colors[index % colors.length]; // 🔹 Alterna los colores según el índice
  }
}
