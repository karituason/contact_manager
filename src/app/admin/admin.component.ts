import {Component, OnInit} from '@angular/core'
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';
import {APIService} from '../service/api.service'

@Component({
    selector:'cm-admin',
    templateUrl:'./admin.component.html'
})

export class AdminComponent implements OnInit{
    users:User[];
    errorMessage:string;

    constructor(private _apiService:APIService){

    }

    ngOnInit(){
        this._apiService.getUsers()
            .subscribe(users => this.users = users,
                error => this.errorMessage=<any> error);
    }
    
}