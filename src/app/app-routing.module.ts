import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/Router';

const appRoutes: Routes = [
    {
        path:'',
        redirectTo:'/contato',
        pathMatch:'full'
    }
];

@NgModule({

    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]

})
export class AppRountingModule{

}