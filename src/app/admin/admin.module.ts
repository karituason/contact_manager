import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import { AdminComponent } from './admin.component';
import { UserDetailComponent } from '../user_detail/user-detail.component';

@NgModule({
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {path:'admin', component:AdminComponent},
            {path:'admin/user-detail',component:UserDetailComponent}
        ])
    ],
    declarations:[
        AdminComponent,
        UserDetailComponent
    ],
    providers:[]
})

export class AdminModule{

}