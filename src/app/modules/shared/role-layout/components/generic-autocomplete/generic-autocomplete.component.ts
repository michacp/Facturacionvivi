import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, map, startWith, combineLatest } from 'rxjs';
@Component({
  selector: 'app-generic-autocomplete',
  standalone: false,
  templateUrl: './generic-autocomplete.component.html',
  styleUrl: './generic-autocomplete.component.scss'
})
export class GenericAutocompleteComponent<T extends { id: any, name: string }> implements OnInit {
    @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() options: T[] = [];
  @Input() control: FormControl = new FormControl();
  @Input() showAddButton: boolean = true;
  @Input() showSearchButton: boolean = true;

  @Output() addClicked = new EventEmitter<void>();
  @Output() searchClicked = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<T>();
  @Output() enterPressed = new EventEmitter<string>(); 

  filteredOptions$: Observable<T[]> = of([]);

  ngOnInit(): void {
    this.setupFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected:', changes);
    if (changes['options'] && !changes['options'].firstChange) {
      this.setupFilter(); // Reinicia el filtro con las nuevas opciones
    }
  }

  private setupFilter(): void {
    this.filteredOptions$ = this.control.valueChanges.pipe(
      startWith(this.control.value || ''),
      map(value => this.filterOptions(value))
    );
  }

  displayFn = (option: T): string => {
    return option?.name || '';
  };

  private filterOptions(value: any): T[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : '';
    return this.options.filter(option =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onSelect(option: T): void {
    this.optionSelected.emit(option);
  }

  onEnter(): void {
    this.enterPressed.emit(this.control.value);
  }

 

  onAddClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.addClicked.emit();
  }

  onSearchClick(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.searchClicked.emit(this.control.value);
  }


}
