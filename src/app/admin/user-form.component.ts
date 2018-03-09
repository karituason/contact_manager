import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink} from '@angular/router';
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
    update:boolean=true;
    btn_name:string;
    heading:string = "User"

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _router: Router){

    }

    ngOnInit(){
        if (this.update){
            this.heading = "Update User";
            this.btn_name = "Save";
        } else{
            this.heading = "Create User";
            this.btn_name = "Create";
        }
    }

    cancel(){
        
    }

    createUser(){

    }

    updateUser(){
        
    }

}