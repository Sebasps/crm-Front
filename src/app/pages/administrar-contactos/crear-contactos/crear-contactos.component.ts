import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ContactosService } from '../../../services/contactos/contactos.service';
import { CrearContactoInterface } from '../../../core/interfaces/contacto.interface';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { ContactoModel } from '../../../core/models/contacto.model';
import { PATH } from '../../../core/enum/path.enum';
import { CrearFormularioDirective } from '../../../core/directives/crear-formulario/crear-formulario.directive';

@Component({
  selector: 'app-crear-contactos',
  standalone: true,
  imports: [ReactiveFormsModule, CrearFormularioDirective],
  templateUrl: './crear-contactos.component.html',
  styleUrl: './crear-contactos.component.css',
})
export class CrearContactosComponent implements OnInit, OnDestroy {
  contactoForm: FormGroup;
  contactoSubscription: Subscription;
  contactoSeleccionado: ContactoModel;

  private formBuilder = inject(FormBuilder);
  private contactosService = inject(ContactosService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarContacto(id);
    });

    this.crearFormulario();
  }

  ngOnDestroy(): void {
    return;
  }

  crearFormulario() {
    this.contactoForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required]],
      numeroCelular: ['', []],
      cargo: ['', [Validators.required]],
      password: ['', []],
    });
  }

  buscarContacto(_id: string) {
    if (_id !== 'nuevo') {
      this.contactosService.getUnContacto(_id).subscribe({
        next: (res: any) => {
          const { nombre, apellido, email, numeroCelular, cargo } =
            res.contacto;

          this.contactoSeleccionado = res.contacto;

          this.contactoForm.patchValue({
            nombre,
            apellido,
            email,
            numeroCelular,
            cargo,
          });
        },
        error: (error: any) => {
          Swal.fire('error', 'Error al encontrar el contacto', 'error');
        },
      });
    }
  }

  crearContacto() {
    if (!this.contactoForm.valid) {
      Swal.fire('Crear contacto', 'Por favor complete el formulario', 'info');
    }

    const data = this.contactoForm.value;
    const nuevoContacto: CrearContactoInterface = {
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      numeroCelular: data.numeroCelular,
      cargo: data.cargo,
      password: data.password,
    };

    if (this.contactoSeleccionado) {
      this.actualizarContacto(nuevoContacto);
    } else {
      this.contactosService.crearContacto(nuevoContacto).subscribe({
        next: (res: any) => {
          Swal.fire(
            'Contacto',
            `El contacto ${data.nombre} ha sido creado con exito`,
            'success'
          );
          this.resetFormulario();
        },
        error: (error) => {
          Swal.fire('Error', `${error.error.smg}`, 'error');
        },
      });
    }
  }

  actualizarContacto(contacto: CrearContactoInterface) {
    const contactoActualizar: ContactoModel = {
      _id: this.contactoSeleccionado._id,
      nombre: contacto.nombre,
      apellido: contacto.apellido,
      email: contacto.email,
      numeroCelular: contacto.numeroCelular,
      cargo: contacto.cargo,
    };

    this.contactosService.actualizarContacto(contactoActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Contacto actualizado',
          `El contacto ${this.contactoSeleccionado.nombre} ha sido actualizado con exito`,
          'success'
        );
        this.router.navigateByUrl(PATH.CONTACTOS);
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.smg}`, 'error');
      },
    });
  }

  resetFormulario() {
    this.contactoForm.reset();
  }
}
