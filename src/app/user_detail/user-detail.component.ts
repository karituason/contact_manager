import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';

import {APIService} from '../service/api.service'
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';

@Component({
    selector:'cm-user-detail',
    templateUrl:'./user-detail.component.html'
})

export class UserDetailComponent implements OnInit{
    user:User;
    username:string;

    constructor(private _apiService:APIService,private _route:ActivatedRoute, private _router:Router){

    }
    
    ngOnInit():void{

        this._route
            .queryParams
            .subscribe(params=>{
                this.username = params['username']
            })
        console.log(this.username)
        this.user = this._apiService.findUser(this.username);
    }

}