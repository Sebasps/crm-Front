import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { AcuerdoModel } from '../../core/models/acuerdo.model';
import { HttpClient } from '@angular/common/http';
import { AcuerdoInterface } from '../../core/interfaces/acuerdi.interface';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class AcuerdosService {
  private router = inject(Router);

  acuerdo: AcuerdoModel;

  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  getAcuerdos() {
    return this.httpClient.get(`${base_url}/acuerdo`, this.headers);
  }

  getUnAcuerdo(id: string) {
    return this.httpClient.get(`${base_url}/acuerdo/${id}`, this.headers);
  }

  crearAcuerdo(acuerdo: AcuerdoInterface) {
    return this.httpClient.post(`${base_url}/acuerdo`, acuerdo, this.headers);
  }

  actualizarAcuerdo(acuerdo: AcuerdoModel) {
    return this.httpClient.put(
      `${base_url}/acuerdo/${acuerdo._id}`,
      acuerdo,
      this.headers
    );
  }

  eliminarAcuerdo(id: string) {
    return this.httpClient.delete(`${base_url}/acuerdo/${id}`, this.headers);
  }
}
