import { ContactoInterface } from './../../../core/interfaces/contacto.interface';
import { ContactosService } from '../../../services/contactos/contactos.service';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../../components/tabla/tabla.component';
import { ContactoModel } from '../../../core/models/contacto.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { PATH } from '../../../core/enum/path.enum';

@Component({
  selector: 'app-contactos',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './contactos.component.html',
  styleUrl: './contactos.component.css',
})
export class ContactosComponent implements OnInit, OnDestroy {
  titulo: string = 'contactos';
  columnas: string[] = [];
  contactos: ContactoModel[] = [];
  dataContactos: ContactoInterface[] = [];
  informacion: ContactoModel;

  contactoSubscription: Subscription;

  private contactosService = inject(ContactosService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarContactos();
  }

  ngOnDestroy(): void {
    this.contactoSubscription?.unsubscribe();
  }

  cargarContactos() {
    this.contactoSubscription = this.contactosService
      .getContactos()
      .subscribe((res: any) => {
        this.contactos = res.contactos;
        this.dataContactos = this.contactos.map((contacto) =>
          this.resumenContacto(contacto)
        );
        this.obtenerColumnas(this.dataContactos);
      });
  }

  resumenContacto(contacto: ContactoModel): ContactoInterface {
    const data: ContactoInterface = {
      nombre: contacto.nombre,
      apellido: contacto.apellido,
      email: contacto.email,
      cargo: contacto.cargo,
      numeroCelular: contacto.numeroCelular,
    };
    return data;
  }

  obtenerColumnas(contactos: ContactoInterface[]) {
    if (contactos.length > 0) {
      this.columnas = Object.keys(contactos[0]);
    }
  }
  recibirInformacion(data: ContactoModel) {
    this.informacion = data;
    Swal.fire({
      title: 'INFORMACIÓN CONTACTO',
      html: `Nombre: ${data.nombre}<br>
            Apellido: ${data.apellido}<br>
            Email: ${data.email}<br>
            Número Celular: ${data.numeroCelular}<br>
            Cargo: ${data.cargo}<br>
            Created At: ${data.createdAt}`,
    });
  }
  irAcrearContactos() {
    this.router.navigateByUrl(`${PATH.CREAR_CONTACTOS}/nuevo`);
  }
  irAactualizarContacto(data: ContactoModel) {
    this.router.navigateByUrl(`${PATH.CREAR_CONTACTOS}/${data._id}`);
  }
  eliminarContacto(data: ContactoModel) {
    this.contactosService.eliminarContacto(data._id).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Contacto',
          `El contacto ${data.nombre} ha sido eliminado con exito`,
          'warning'
        );
        this.cargarContactos();
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.smg}`, 'error');
      },
    });
  }
}
