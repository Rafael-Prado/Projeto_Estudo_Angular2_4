import { NgModule } from '@angular/core';   
import { CommonModule } from '@angular/common';
import { FormsModule } from'@angular/forms';

import { ContatoBuscaComponet } from './contato-busca-component';
import { ContatosComponet } from './contatos.component'; 
import { ContatoRoutingModule } from './contato_routing.module';
import { ContatoDetalhe } from './contato_detalhe.component';
import { ContatoService } from './contato.service';

@NgModule({
    imports:[
        CommonModule,
        ContatoRoutingModule,
        FormsModule
    ],
    declarations:[
        ContatosComponet,
        ContatoDetalhe,
        ContatoBuscaComponet
    ],
    exports:[
        ContatosComponet,
        ContatoBuscaComponet
    ],
    providers:[
        ContatoService
    ]

})
export class ContatosModule{

}