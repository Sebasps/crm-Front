import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-tabla',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tabla.component.html',
  styleUrl: './tabla.component.css',
})
export class TablaComponent implements OnInit, OnChanges {
  @Input() titulo: string = '';
  @Input() columnas: string[] = [];
  @Input() data: any[] = [];
  @Input() mostrarAcciones: boolean = true;

  @Output() onInformacion: EventEmitter<any> = new EventEmitter<any>();
  @Output() onActualizar: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEliminar: EventEmitter<any> = new EventEmitter<any>();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue) {
      this.data = changes['data'].currentValue;
    }
  }

  formatearNombreDeColumnas(columna: string): string {
    //Dividir el nobmre por mayusculas y unir con espacios
    return columna.replace(/([a-z])([A-Z])/g, '$1 $2').toLocaleUpperCase();
  }
  isFecha(value: any): boolean {
    return value instanceof Date;
  }

  enviarInformacion(data: any) {
    //Emite el evento con la informacion de "data"
    this.onInformacion.emit(data);
  }

  actualizar(data: any) {
    this.onActualizar.emit(data);
  }

  eliminar(data: any) {
    this.onEliminar.emit(data);
  }
}
