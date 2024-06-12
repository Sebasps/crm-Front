export interface ContactoInterface {
  nombre: string;
  apellido: string;
  email: string;
  numeroCelular?: number;
  cargo: string;
  createdAt?: Date;
}

export interface CrearContactoInterface {
  nombre: string;
  apellido: string;
  email: string;
  numeroCelular?: number;
  cargo: string;
  password?: string;
}
