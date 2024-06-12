export class AcuerdoModel {
  constructor(
    public readonly _id: string,
    public descripcion: string,
    public etapa: string,
    public usuario: string,
    public cliente: string,
    public createdAt?: Date
  ) {}
}
