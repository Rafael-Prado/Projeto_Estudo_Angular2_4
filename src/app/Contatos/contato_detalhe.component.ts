
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/Router';
import { Location } from '@angular/common';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { Params } from '@angular/Router/src/shared';

@Component({
    moduleId: module.id,
    selector:'contato_detalhe',
    templateUrl:'contato_detalhe.component.html'
})
export class ContatoDetalhe implements OnInit{

    contato: Contato;
    private isNew: boolean = true;

    constructor(private contatoService: ContatoService, 
    private route: ActivatedRoute,
    private location: Location
){}
    ngOnInit(): void {  
        this.contato = new Contato(0, '', '', '');
        this.route.params.forEach((params: Params) =>{
            let id: number = +params['id'];
            if(id){
                
                this.isNew = false;
                this.contatoService.find(id)
                    .then((contato: Contato) => {
                        this.contato = contato;
                });
            }
            
        });
    }

    getFormGroupClass(isValid: boolean, isPristine: boolean): {} {
        return{
            'form-group': true,
            'has-danger': !isValid && !isPristine,
            'has-success': isValid && !isPristine
        };
    }

    getFormControlClass(isValid: boolean, isPristine: boolean): {} {
        return{
            'form-control': true,
            'form-control-danger': !isValid && !isPristine,
            'form-control-success': isValid && !isPristine
        };
    }

    onSubmit(): void {
        let promise;
       if (this.isNew) {
        promise = this.contatoService.create(this.contato);           
       }else{
        promise = this.contatoService.update(this.contato);           
       }
       promise.then(contato => this.goBack())        
    }
    
    goBack(): void{
        this.location.back();
    }
    
}