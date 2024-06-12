import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ContactosService } from '../../../services/contactos/contactos.service';
import { PATH } from '../../enum/path.enum';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const contactosService = inject(ContactosService);
  const router = inject(Router);

  return contactosService.validateToken().pipe(
    tap((isAutenicado) => {
      if (!isAutenicado) {
        router.navigateByUrl(PATH.LOGIN);
      }
    })
  );
};
