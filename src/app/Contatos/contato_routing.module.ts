
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/Router';

import { ContatoDetalhe } from './contato_detalhe.component';
import { ContatosComponet } from './contatos.component';

const  contatosRoutes: Routes =[
    {
        path:'contato',
        component:ContatosComponet
    },
    {
        path:'contato/save',
        component: ContatoDetalhe
    },
    {
        path:'contato/save/:id',
        component: ContatoDetalhe
    }
]
@NgModule({
    imports:[
        RouterModule.forChild(contatosRoutes)
    ],
    exports:[RouterModule]
})
export class ContatoRoutingModule{

}