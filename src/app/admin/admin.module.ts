import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import { AdminComponent } from './admin.component';
import { UserDetailComponent } from './user-detail.component';
import { UserFormComponent } from './user-form.component';
import { CreateUserFormComponent } from './create-user-form.component';
import { AdminRedirectComponent } from './admin-redirect.component';

@NgModule({
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {path:'admin', component:AdminComponent},
            {path:'admin/user-detail',component:UserDetailComponent},
            {path:'admin/user-form',component:UserFormComponent},
            {path:'admin/create-user',component:CreateUserFormComponent},
            {path:'admin/refresh', component:AdminRedirectComponent}
        ])
    ],
    declarations:[
        AdminComponent,
        UserDetailComponent,
        UserFormComponent,
        CreateUserFormComponent,
        AdminRedirectComponent
    ],
    providers:[]
})

export class AdminModule{

}