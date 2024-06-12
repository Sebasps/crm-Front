export class ContactoModel {
  constructor(
    public readonly _id: string,
    public nombre: string,
    public apellido: string,
    public email: string,
    public cargo: string,
    public numeroCelular?: number,
    public password?: string,
    public createdAt?: Date
  ) {}
}
