import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericSelectorComponent } from './generic-selector.component';

describe('GenericSelectorComponent', () => {
  let component: GenericSelectorComponent;
  let fixture: ComponentFixture<GenericSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenericSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
