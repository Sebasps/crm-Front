import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { TablaComponent } from '../../../components/tabla/tabla.component';
import { AcuerdoModel } from '../../../core/models/acuerdo.model';
import { AcuerdoInterface } from '../../../core/interfaces/acuerdo.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AcuerdosService } from '../../../services/acuerdos/acuerdos.service';
import { PATH } from '../../../core/enum/path.enum';

@Component({
  selector: 'app-acuerdos',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './acuerdos.component.html',
  styleUrl: './acuerdos.component.css',
})
export class AcuerdosComponent implements OnInit, OnDestroy {
  titulo: string = 'acuerdos';
  columnas: string[] = [];
  acuerdos: AcuerdoModel[] = [];
  dataAcuerdos: AcuerdoInterface[] = [];
  informacion: AcuerdoModel;

  acuerdoSubscription: Subscription;

  private acuerdosService = inject(AcuerdosService);
  private router = inject(Router);

  ngOnInit(): void {
    this.cargarAcuerdos();
  }

  ngOnDestroy(): void {
    this.acuerdoSubscription?.unsubscribe();
  }

  cargarAcuerdos() {
    this.acuerdoSubscription = this.acuerdosService
      .getAcuerdos()
      .subscribe((res: any) => {
        this.acuerdos = res.acuerdos;
        this.dataAcuerdos = this.acuerdos.map((acuerdo) =>
          this.resumenAcuerdo(acuerdo)
        );
        this.obtenerColumnas(this.dataAcuerdos);
      });
  }

  resumenAcuerdo(acuerdo: AcuerdoModel): AcuerdoInterface {
    const data: AcuerdoInterface = {
      descripcion: acuerdo.descripcion,
      etapa: acuerdo.etapa,
      usuario: acuerdo.usuario,
      cliente: acuerdo.cliente,
      createdAt: acuerdo.createdAt,
    };
    return data;
  }

  obtenerColumnas(acuerdos: AcuerdoInterface[]) {
    if (acuerdos.length > 0) {
      this.columnas = Object.keys(acuerdos[0]);
    }
  }
  actualizarAcuerdo(data: AcuerdoModel) {
    this.router.navigateByUrl(`${PATH.CREAR_ACUERDOS}/${data._id}`);
  }
  crearAcuerdo() {
    this.router.navigateByUrl(`${PATH.CREAR_ACUERDOS}/nuevo`);
  }

  eliminarAcuerdo(data: AcuerdoModel) {
    this.acuerdosService.eliminarAcuerdo(data._id).subscribe({
      next: (res: any) => {
        Swal.fire(
          'Acuerdo',
          `El acuerdo con ${data.cliente} ha sido eliminado con exito`,
          'warning'
        );
        this.cargarAcuerdos();
      },
      error: (error) => {
        Swal.fire('Error', `${error.error.smg}`, 'error');
      },
    });
  }
}
