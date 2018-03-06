import {Component} from '@angular/core'
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';

@Component({
    selector:'cm-user',
    templateUrl:'./user.component.html'
})

export class UserComponent{
    user:User = new User("user","password","user","name",[new Contact("name", 1234567890, "s@s.com")] );
    contacts:Contact[] = this.user.contacts;
}