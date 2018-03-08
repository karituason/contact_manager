import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Router} from '@angular/router';

import {APIService} from '../service/api.service'
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';
import { Httpprovider } from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({
    selector:'cm-user-detail',
    templateUrl:'./user-detail.component.html'
})

export class UserDetailComponent implements OnInit{
    public user: any = {username:"",
                password:"",
                userType:"",
                firstname:"",
                lastname:"",
                numContacts:0
            };
    username:string;

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails,private _route:ActivatedRoute, private _router:Router){

    }
    
    ngOnInit():void{
        
    }

}