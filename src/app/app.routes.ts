import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { PATH } from './core/enum/path.enum';
import { ContactosComponent } from './pages/administrar-contactos/contactos/contactos.component';
import { CrearContactosComponent } from './pages/administrar-contactos/crear-contactos/crear-contactos.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { contactosResolver } from './core/resolvers/contactos/contactos.resolver';
import { AcuerdosComponent } from './pages/administrar-acuerdos/acuerdos/acuerdos.component';
import { CrearAcuerdosComponent } from './pages/administrar-acuerdos/crear-acuerdos/crear-acuerdos.component';

export const routes: Routes = [
  {
    path: PATH.LOGIN,
    title: 'login',
    component: LoginComponent,
  },
  {
    path: PATH.HOME,
    title: 'Inicio',
    canActivate: [authGuard],
    children: [
      {
        path: PATH.INICIO,
        title: 'Inicio',
        component: InicioComponent,
      },
      {
        path: PATH.CONTACTOS,
        title: 'Contactos',
        component: ContactosComponent,
      },
      {
        path: `${PATH.CREAR_CONTACTOS}/:id`,
        title: 'Crear Contactos',
        component: CrearContactosComponent,
      },
      {
        path: PATH.ACUERDOS,
        title: 'Acuerdos',
        component: AcuerdosComponent,
      },
      {
        path: `${PATH.CREAR_ACUERDOS}/:id`,
        title: 'Crear Acuerdos',
        component: CrearAcuerdosComponent,
      },
    ],
  },
];
