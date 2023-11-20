import { AbstractEntity } from "../abstract-entity/abstract-entity";
import { Animal } from "../animal/animal";

export class Vacina extends AbstractEntity {
nome! : string;
dataAplicacao! : Date;
dataRetorno! : Date;
descricao! : string;
animal! : Animal;
}
