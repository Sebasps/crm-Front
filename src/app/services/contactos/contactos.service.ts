import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ContactoModel } from '../../core/models/contacto.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CrearContactoInterface } from '../../core/interfaces/contacto.interface';
import { LoginInterface } from '../../core/interfaces/login.interface';
import { PATH } from '../../core/enum/path.enum';
import { Router } from '@angular/router';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root',
})
export class ContactosService {
  private router = inject(Router);

  contacto: ContactoModel;

  constructor(private httpClient: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: { 'x-token': this.token },
    };
  }

  validateToken(): Observable<boolean> {
    return this.httpClient
      .get(`${base_url}/login`, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((resp: any) => {
          const {
            _id,
            nombre,
            apellido,
            email,
            cargo,
            createdAt,
            numeroCelular,
            password,
          } = resp.contacto;

          this.contacto = new ContactoModel(
            _id,
            nombre,
            apellido,
            email,
            cargo,
            createdAt,
            numeroCelular,
            password
          );
          localStorage.setItem('token', resp.token);
          return true;
        }),
        catchError((error) => {
          console.error(error);
          return of(false);
        })
      );
  }

  login(login: LoginInterface) {
    return this.httpClient.post(`${base_url}/login`, login).pipe(
      tap((resp: any) => {
        localStorage.setItem('token', resp.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl(PATH.LOGIN);
  }

  getContactos() {
    return this.httpClient.get(`${base_url}/contacto`, this.headers);
  }

  getUnContacto(id: string) {
    return this.httpClient.get(`${base_url}/contacto/${id}`, this.headers);
  }

  crearContacto(contacto: CrearContactoInterface) {
    return this.httpClient.post(`${base_url}/contacto`, contacto, this.headers);
  }

  actualizarContacto(contacto: ContactoModel) {
    return this.httpClient.put(
      `${base_url}/contacto/${contacto._id}`,
      contacto,
      this.headers
    );
  }

  eliminarContacto(id: string) {
    return this.httpClient.delete(`${base_url}/contacto/${id}`, this.headers);
  }
}
