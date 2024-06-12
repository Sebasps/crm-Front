import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { contactosResolver } from './contactos.resolver';

describe('contactosResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => contactosResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
