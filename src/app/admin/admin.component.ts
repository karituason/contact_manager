import {Component, OnInit} from '@angular/core'
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';

@Component({
    selector:'cm-admin',
    templateUrl:'./admin.component.html'
})

export class AdminComponent implements OnInit{
    users:User[] = [new User("user","password","user", "user", [new Contact("name",1234567890,"s@s.com")])]

    ngOnInit(){
        console.log(this.users);
    }
    
}