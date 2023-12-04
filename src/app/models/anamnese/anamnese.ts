import { AbstractEntity } from "../abstract-entity/abstract-entity";
import { AnamnesePergunta } from "../anamnese-pergunta/anamnese-pergunta";
import { Animal } from "../animal/animal";
import { Consulta } from "../consulta/consulta";
import { ProgressoMedico } from "../progresso-medico/progresso-medico";
import { Tutor } from "../tutor/tutor";
import { Usuario } from "../usuario/usuario";

export class Anamnese extends AbstractEntity{
    animalDTO: Animal;
    tutorDTO: Tutor;
    veterinarioDTO: Usuario;
    queixaPrincipal!: string;
    historicoProgressoMedico: ProgressoMedico[];
    alimentacao!: string;
    contactantes!: string;
    ambiente!: string;
    vacinacao!: string;
    vermifugacao!: string;
    sistemaRespiratorio!: string;
    sistemaCardiovascular!: string;
    sistemaUrinario!: string;
    sistemaReprodutor!: string;
    sistemaLocomotor!: string;
    sistemaNeurologico!: string;
    sistemaDigestorio!: string;
    pele!: string;
    olhos!: string;
    ouvidos!: string;
    anamnesePerguntas: AnamnesePergunta[];
    consulta!: Consulta;

    constructor(){
        super();
        this.animalDTO = new Animal();
        this.tutorDTO = new Tutor();
        this.veterinarioDTO = new Usuario();
        this.consulta = new Consulta();
        this.historicoProgressoMedico = [];
        this.anamnesePerguntas = [];
    }
}
