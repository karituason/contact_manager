import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink, ActivatedRoute} from '@angular/router';
import { Http, Response, Request,RequestMethod, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';

import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({
    selector:'cm-user-form',
    templateUrl: './user-form.component.html'

})

export class UserFormComponent implements OnInit{
    user:any = {
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        numContacts:0
    }
    btn_name:string = "Save";
    heading:string = "Update User"

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _router: Router, private _route:ActivatedRoute){

    }

    ngOnInit(){
        if(!this._userdetails.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetails.getUserType() === "user"){
            this._router.navigate(['/user']);
        }
        this._route
        .queryParams
        .subscribe(params =>{
            this.user.username = params['username'];
        })

        this._httpprovider
        .httpReq('http://localhost:9001/admin/userdetail', 
            'POST',
            {username:this.user.username},
            null)
        .subscribe((data)=>{
            this.user.firstname = data.firstname;
            this.user.lastname = data.lastname;
            this.user.numContacts = data.numContacts;
        })

        this._httpprovider
        .httpReq('http://localhost:9001/admin/getUserLogin', 
            'POST',
            {username:this.user.username},
            null)
        .subscribe((data)=>{
            this.user.password = data.password;
            this.user.userType = data.userType;
        })
    }

    cancel(){
        this._router.navigate(['/admin/user-detail'],
        {queryParams:{username: this.user.username }})
    }
    updateUser(form:NgForm){
        console.log("in update user")
        if(!form.invalid){
            this._httpprovider
                .httpReq('http://localhost:9001/admin/users/update', 
                    'POST',
                    {
                        username: this.user.username,
                        password: this.user.password,
                        firstname: this.user.firstname,
                        lastname: this.user.lastname
                    },
                    null)
                .subscribe((data)=>{
                    if (data){
                        this._router.navigate(['/admin/user-detail'], 
                        {queryParams:{username: this.user.username}})                    } else {
                    
                    }
                })
        }
    }

}