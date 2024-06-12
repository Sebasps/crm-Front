import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAcuerdosComponent } from './crear-acuerdos.component';

describe('CrearAcuerdosComponent', () => {
  let component: CrearAcuerdosComponent;
  let fixture: ComponentFixture<CrearAcuerdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAcuerdosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearAcuerdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
