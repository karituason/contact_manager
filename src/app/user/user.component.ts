import {Component} from '@angular/core'
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';

@Component({
    selector:'cm-user',
    templateUrl:'./user.component.html'
})

export class UserComponent{
    user:User = new User("user","fn", "ln", 0 );
    contacts:Contact[];
}