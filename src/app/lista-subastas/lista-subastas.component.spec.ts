import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubastasComponent } from './lista-subastas.component';

describe('ListaSubastasComponent', () => {
  let component: ListaSubastasComponent;
  let fixture: ComponentFixture<ListaSubastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaSubastasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaSubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
