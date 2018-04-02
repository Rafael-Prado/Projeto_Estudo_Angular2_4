import { Component,EventEmitter, OnInit, OnChanges, Output, Input, SimpleChanges, SimpleChange } from '@angular/core';
import { Router } from '@angular/Router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { Contato } from './contato.model';
import { ContatoService } from './contato.service';
import { style } from '@angular/core/src/animation/dsl';

@Component({
    moduleId: module.id,
    selector: 'contato-busca',
    templateUrl: 'contato-busca-component.html',
    styles: [`
            .cursor-pointer: houver{
                cursor: pointer;
            }
    `]
})
export class ContatoBuscaComponet implements OnInit, OnChanges {

    @Input()busca: string;
    @Output() buscaChange: EventEmitter<string> = new EventEmitter<string>();
    contatos: Observable<Contato[]>;
    private TermosDaBusca: Subject<string> = new Subject<string>();

    constructor(
        private ContatoService: ContatoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.contatos = this.TermosDaBusca
            .debounceTime(500) //aguarda 3millisegundo para a proxima requisição
            .distinctUntilChanged()// ignore se próximo termo de busca for igual o interior
            .switchMap(term => term ? this.ContatoService.search(term) : Observable.of<Contato[]>([]))
            .catch(err => {
                console.log(err);
                return Observable.of<Contato[]>([]);
            });

    }
    ngOnChanges(change: SimpleChanges): void{
        let busca: SimpleChange = change['busca']
        this.search(busca.currentValue);
    }

    search(termo: string): void {
        this.TermosDaBusca.next(termo);
        this.buscaChange.emit(termo);
    }

    verDetalhes(contato: Contato): void {
        let link = ['contato/save', contato.id];
        this.router.navigate(link);
        this.buscaChange.emit('');
    }
}