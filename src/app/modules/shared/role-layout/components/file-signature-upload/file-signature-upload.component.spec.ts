import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSignatureUploadComponent } from './file-signature-upload.component';

describe('FileSignatureUploadComponent', () => {
  let component: FileSignatureUploadComponent;
  let fixture: ComponentFixture<FileSignatureUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileSignatureUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSignatureUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
