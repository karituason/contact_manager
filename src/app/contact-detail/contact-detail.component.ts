import {Component} from '@angular/core';

@Component({
    selector:'cm-contactdetail',
    templateUrl:'./contact-detail.component.html'
})

export class ContactDetailComponent{
    contact:any = {
        firstname: "holder",
        lastname: "holder",
        phone: 1234567890,
        email: "holder@hold.hol"
    }
}

