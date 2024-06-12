import { ContactosService } from './../../../services/contactos/contactos.service';
import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { ContactoModel } from '../../models/contacto.model';

@Directive({
  selector: '[appCargo]',
  standalone: true,
})
export class CargoDirective implements OnInit {
  private contacto: ContactoModel;
  private cargos: string[];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private contactosService: ContactosService
  ) {}

  ngOnInit(): void {
    this.contacto = this.contactosService.contacto;
    this.actualizarVista();
  }

  @Input('appCargo')
  set appCargo(valor: string[]) {
    this.cargos = valor;
  }

  private actualizarVista(): void {
    this.viewContainer.clear();
    if (this.validarCargos()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private validarCargos(): boolean {
    let tieneCargos: boolean = false;

    if (this.contacto && this.contacto.cargo) {
      for (let [index, cargo] of this.cargos.entries()) {
        if (this.contacto.cargo.toUpperCase() === cargo) {
          tieneCargos = true;
          return tieneCargos;
        }
      }
    }
    return tieneCargos;
  }
}
