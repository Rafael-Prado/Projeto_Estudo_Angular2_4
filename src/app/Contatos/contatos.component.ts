import { Component, OnInit } from '@angular/core';

import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { DialogService } from '../dialog.service';


@Component({
    moduleId: module.id,
    selector:'contatos',
    templateUrl: 'contatos.component.html',
})
export class ContatosComponet implements OnInit{

    contatos: Contato[] = [];
    mensagem: {};
    classCss: {};
    private currentTimeout: any;

    constructor( 
        private contatoService: ContatoService,
        private dialoServise: DialogService
    ){  }

    ngOnInit(): void {
       this.contatoService.getContatos()
        .then((contatos: Contato[]) =>{
            this.contatos = contatos;
        }).catch(err => {
            console.log(err);
            this.mostraMensagem({
                tipo:'danger',
                texto : 'Ocorreu um erro ao buscar lista de contatos!'
            })
        });
    }

    onDelete(contato: Contato): void {
      this.dialoServise.confirm('Deseja deletar o contato ' + contato.nome)
      .then((canDelete: boolean) =>{
        if (canDelete) {
            this.contatoService.delete(contato)
            .then(() => {
                this.contatos = this.contatos.filter(c => c.id != contato.id)

                this.mostraMensagem({
                    tipo:'success',
                    texto : 'Contato deletado!'
                })

            }).catch(err => {
                console.log(err);
                this.mostraMensagem({
                    tipo:'danger',
                    texto : 'Ocorreu um erro ao deletar contato!'
                })
            });
        }
      });
    }  

    private mostraMensagem(mensagem: {tipo: string, texto: string}): void{
        this.mensagem = mensagem;
        this.montarClass(mensagem.tipo);
        if (mensagem.tipo != 'danger') {
            if (this.currentTimeout) {
                clearTimeout(this.currentTimeout);
            }
            this.currentTimeout = setTimeout(() =>{
                this.mensagem = undefined;
            }, 3000);   
        }
              
    }

    private montarClass(tipo: string): void {
        this.classCss = {
            'alert': true
        };
        this.classCss['alert-' + tipo ] = true;
    }
}