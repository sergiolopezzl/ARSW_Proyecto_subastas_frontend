import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudSubastasComponent } from './crud-subastas.component';

describe('CrudSubastasComponent', () => {
  let component: CrudSubastasComponent;
  let fixture: ComponentFixture<CrudSubastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrudSubastasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudSubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
