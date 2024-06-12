import { PATH } from '../core/enum/path.enum';
import { MenuInfoInterface } from '../core/interfaces/menu-info.interfase';

export const MenuRoutes: MenuInfoInterface[] = [
  {
    path: PATH.HOME,
    title: 'Home',
    icon: 'fa-solid fa-house',
    classCss: '',
    submenu: [],
  },
  {
    path: PATH.CONTACTOS,
    title: 'Contactos',
    icon: 'fa-solid fa-users',
    classCss: '',
    submenu: [],
  },
  {
    path: PATH.ACUERDOS,
    title: 'Acuerdos',
    icon: 'fa-solid fa-list-check',
    classCss: '',
    submenu: [],
  },
];
