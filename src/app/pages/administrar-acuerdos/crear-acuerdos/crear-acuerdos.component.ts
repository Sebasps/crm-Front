import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { AcuerdoModel } from '../../../core/models/acuerdo.model';
import { AcuerdosService } from '../../../services/acuerdos/acuerdos.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AcuerdoInterface } from '../../../core/interfaces/acuerdo.interface';
import { PATH } from '../../../core/enum/path.enum';
import { CrearFormularioDirective } from '../../../core/directives/crear-formulario/crear-formulario.directive';
import { ContactoModel } from '../../../core/models/contacto.model';

@Component({
  selector: 'app-crear-acuerdos',
  standalone: true,
  imports: [ReactiveFormsModule, CrearFormularioDirective],
  templateUrl: './crear-acuerdos.component.html',
  styleUrl: './crear-acuerdos.component.css',
})
export class CrearAcuerdosComponent implements OnInit, OnDestroy {
  acuerdoForm: FormGroup;
  isAcuerdo: boolean = false;
  acuerdoSubscription: Subscription;
  acuerdoSeleccionado: AcuerdoModel;
  contactos: ContactoModel[] = [];

  private formBuilder = inject(FormBuilder);
  private acuerdosService = inject(AcuerdosService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  get formAcuerdo() {
    return this.acuerdoForm.controls;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.buscarAcuerdo(id);
    });

    this.activatedRoute.params.subscribe(({ contactos }) => {
      this.contactos = contactos;
    });

    this.crearFormulario();
  }

  ngOnDestroy(): void {
    return;
  }

  crearFormulario() {
    this.acuerdoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      etapa: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
    });
  }

  buscarAcuerdo(_id: string) {
    if (_id !== 'nuevo') {
      this.acuerdosService.getUnAcuerdo(_id).subscribe({
        next: (res: any) => {
          const { descripcion, etapa, usuario, cliente } = res.acuerdo;

          this.acuerdoSeleccionado = res.acuerdo;

          this.acuerdoForm.patchValue({
            descripcion,
            etapa,
            usuario,
            cliente,
          });
        },
        error: (error: any) => {
          Swal.fire('error', 'Error al encontrar el acuerdo', 'error');
        },
      });
    }
  }

  crearAcuerdo() {
    this.isAcuerdo = true;

    if (this.acuerdoForm.invalid) {
      return;
    }

    const data = this.acuerdoForm.value;
    const nuevoAcuerdo: AcuerdoInterface = {
      descripcion: data.descripcion,
      etapa: data.etapa,
      usuario: data.usuario,
      cliente: data.cliente,
    };

    if (this.acuerdoSeleccionado) {
      this.actualizarAcuerdo(nuevoAcuerdo);
    } else {
      this.acuerdosService.crearAcuerdo(nuevoAcuerdo).subscribe({
        next: (res: any) => {
          Swal.fire(
            'acuerdo',
            `El acuerdo con ${data.cliente} ha sido creado con exito`,
            'success'
          );
          this.router.navigateByUrl(`${PATH.ACUERDOS}`);
        },
        error: (error) => {
          Swal.fire('Error', `${error.error.smg}`, 'error');
        },
      });
    }
  }

  actualizarAcuerdo(acuerdo: AcuerdoInterface) {
    const acuerdoActualizar: AcuerdoModel = {
      _id: this.acuerdoSeleccionado._id,
      descripcion: acuerdo.descripcion,
      etapa: acuerdo.etapa,
      usuario: acuerdo.usuario,
      cliente: acuerdo.cliente,
    };

    this.acuerdosService.actualizarAcuerdo(acuerdoActualizar).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Acuerdo actualizado',
          `El acuerdo con ${this.acuerdoSeleccionado.cliente} ha sido actualizado con exito`,
          'success'
        );
        this.router.navigateByUrl(PATH.ACUERDOS);
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.smg}`, 'error');
      },
    });
  }

  resetFormulario() {
    this.acuerdoForm.reset();
  }
}
