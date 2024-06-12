import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearContactosComponent } from './crear-contactos.component';

describe('CrearContactosComponent', () => {
  let component: CrearContactosComponent;
  let fixture: ComponentFixture<CrearContactosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearContactosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearContactosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
