import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastaDetailComponent } from './subasta-detail.component';

describe('SubastaDetailComponent', () => {
  let component: SubastaDetailComponent;
  let fixture: ComponentFixture<SubastaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubastaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
