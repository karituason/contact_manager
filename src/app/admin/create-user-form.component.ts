import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink, ActivatedRoute} from '@angular/router';
import { Http, Response, Request,RequestMethod, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';

import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({
    selector:'cm-user-form',
    templateUrl: './create-user-form.component.html'

})

export class CreateUserFormComponent implements OnInit{
    user:any = {
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        numContacts:0
    }
    exists:boolean=false;
    proceed:boolean = false;
    invalidUser:string = "";
    btn_name:string = "Create";
    heading:string = "Create User"
    errorMessage:string

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _router: Router, private _route:ActivatedRoute){

    }

    ngOnInit(){
        this._route
        .queryParams
        .subscribe(params =>{
            this.user.username = params['username'];
            this.user.firstname = params['firstname'];
            this.user.lastname = params['lastname'];
        })
    }

    cancel(){
        this._router.navigate(['/admin'])
    }

    createUser(form:NgForm){
        console.log("in create user")
        console.log(form);
        if(!form.invalid){
            console.log(this.proceed);
            this._httpprovider
            .httpReq('http://localhost:9001/admin/userdetail', 
                'POST',
                {username: this.user.username},
                null)
            .subscribe((data)=>{
                console.log(data);
                if (data !==null && (data.username !== null || data.username !== undefined)){
                    this.exists = true;
                    console.log("in if")
                }else {
                    console.log("here");
                    this._httpprovider
                            .httpReq('http://localhost:9001/admin/users/add', 
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
                                    this._router.navigate(['/admin/user-detail'], {queryParams:{username: this.user.username}});
                                } else {
                                
                                }
                            })
                }
            },
                error => {this.errorMessage=<any>error;
                            console.log(this.errorMessage)});
        }
    }

}