import { ContactosService } from './../../services/contactos/contactos.service';
import { Component, OnInit, inject } from '@angular/core';
import { MenuInfoInterface } from '../../core/interfaces/menu-info.interfase';
import { MenuRoutes } from '../../menu/menu';
import { RouterLink } from '@angular/router';
import { CargoDirective } from '../../core/directives/cargo/cargo.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CargoDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuItems: MenuInfoInterface[] = [];

  private contactosServices = inject(ContactosService);

  ngOnInit(): void {
    this.menuItems = MenuRoutes;
  }

  cerrarSesion() {
    this.contactosServices.logout();
  }
}
