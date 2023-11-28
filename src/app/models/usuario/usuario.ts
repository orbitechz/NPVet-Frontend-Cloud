import { AbstractEntity } from '../abstract-entity/abstract-entity';
import { Role } from '../enums/role';

export class Usuario extends AbstractEntity {
  nome!: string;
  cpf!: string;
  role!: Role;
  username!: string;
  senha!: string;
  token!: string;
}
