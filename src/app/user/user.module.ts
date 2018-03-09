import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import { UserComponent } from './user.component';
import { ContactDetailComponent } from './contact-detail.component';
import { ContactFormComponent } from './contact-form.component';
import { CreateContactFormComponent } from './create-contact-form.component';


@NgModule({
    imports:[
        FormsModule,
        CommonModule,
        RouterModule.forChild([
            {path:'user', component:UserComponent},
            {path:'user/contact', component:ContactDetailComponent},
            {path:'user/contact-form', component:ContactFormComponent},
            {path:'user/create-contact', component:CreateContactFormComponent}
        ])
    ],
    declarations:[
        UserComponent,
        ContactDetailComponent,
        ContactFormComponent,
        CreateContactFormComponent     
    ],
    providers:[]
})

export class UserModule{

}