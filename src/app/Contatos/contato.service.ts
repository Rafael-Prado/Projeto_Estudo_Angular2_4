import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";

import { Observable } from "rxjs";

import { CONTATOS } from './contatosMock';
import { Contato } from './contato.model';
import { ServiceInterface } from "../Interfaces/service.interface";

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContatoService implements ServiceInterface<Contato>{

    private urlApi: string = 'app/contatos';
    private headers: Headers = new Headers({'Content-Type': 'aplication/json'});
    
    constructor( 
        private http: Http
    ){}

    findAll(): Promise<Contato[]>{
        return this.http.get(this.urlApi)
            .toPromise()
            .then(response => response.json() as Contato[])
            .catch(this.handleError);
    }
    
    find(id: number): Promise<Contato>{
        return this.findAll()
        .then((contatos: Contato[]) => contatos.find(contato => contato.id === id));   
    }

    private handleError(err: any): Promise<any> {
        return Promise.reject(err.message || err);  
    }
    
    create(contato: Contato): Promise<Contato>{
            return this.http.post(this.urlApi, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then((reponse: Response) => reponse.json() as Contato)
            .catch(this.handleError);
    }

    update(contato: Contato): Promise<Contato>{
        const url = `${this.urlApi}/${contato.id}`;
        return this.http
            .post(url, JSON.stringify(contato), {headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);

    }
    delete(contato: Contato): Promise<Contato>{
        const url = `${this.urlApi}/${contato.id}`;
        return this.http
            .delete(url,{headers: this.headers})
            .toPromise()
            .then(() => contato as Contato)
            .catch(this.handleError);
    }

    search(term: string): Observable<Contato[]>{
        return this.http
            .get(`${this.urlApi}/?nome=${term}`)
            .map((res: Response) => res.json() as Contato[]);
    }
    
    
}
    