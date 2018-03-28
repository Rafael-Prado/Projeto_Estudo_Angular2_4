import{ InMemoryDbService } from 'angular-in-memory-web-api';
import { Contato } from './Contatos/contato.model';


export class InMemoryDataService implements InMemoryDbService{

    createDb(): {} {

        let contatos: Contato[] = [
            {id:1, nome:'Rafael prado', email:'rafael@email', telefone:'(00)9999999999'},
            {id:2, nome:'Juca prado', email:'juca@email', telefone:'(00)9999999999'},
            {id:3, nome:'Martelo prado', email:'mar@email', telefone:'(00)9999999999'},
            {id:4, nome:'Neri prado', email:'ner@email', telefone:'(00)9999999999'}
           ];

           return {contatos};
    }

}