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
    errorMessage:string;

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails,private _route:ActivatedRoute, private _router:Router){
        
    }
    
    ngOnInit():void{
        if(!this._userdetails.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetails.getUserType() === "user"){
            this._router.navigate(['/user']);
        }

        this._route
            .queryParams
            .subscribe(params=>{
                this.username = params['username'];
            })
        console.log(this.username)
        
        this._httpprovider
        .httpReq('http://localhost:9001/admin/userdetail', 
            'POST',
            {username:this.username},
            null)
        .subscribe((data)=>{
            this.user.firstname = data.firstname;
            this.user.lastname = data.lastname;
            this.user.numContacts = data.numContacts;
        })

        this._httpprovider
        .httpReq('http://localhost:9001/admin/getUserLogin', 
            'POST',
            {username:this.username},
            null)
        .subscribe((data)=>{
            this.user.username = data.username;
            this.user.password = data.password;
            this.user.userType = data.userType;
        })
    }

    editUser(){
        this._router.navigate(['/admin/user-form'],
            {queryParams: {update:true, username: this.user.username}});
    }

    deleteUser(){
        this._httpprovider.httpReq('http://localhost:9001/admin/users/delete', 'POST', {username: this.user.username}, null);
    }

    back(){
        this._router.navigate(['/admin']);
    }

}