import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericChipsSelectorComponent } from './generic-chips-selector.component';

describe('GenericChipsSelectorComponent', () => {
  let component: GenericChipsSelectorComponent;
  let fixture: ComponentFixture<GenericChipsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericChipsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericChipsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
