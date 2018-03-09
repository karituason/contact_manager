import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink, ActivatedRoute} from '@angular/router';
import { Http, Response, Request,RequestMethod, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';

import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({
    selector:'cm-contact-form',
    templateUrl: './create-contact-form.component.html'

})

export class CreateContactFormComponent implements OnInit{
    contact:any = {
        username:"",
        firstname:"",
        lastname:"",
        phone: null,
        email: "",
    }
    btn_name:string = "Create";
    heading:string = "Contact"

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _route:ActivatedRoute, private _router: Router){

    }

    ngOnInit(){
        console.log(this._userdetails)
        this.contact.username = this._userdetails.username;
        console.log(this.heading)
    }

    cancel(){
        this._router.navigate(['/user'],
            {queryParams: {
                username:this.contact.username
            }}
            );
    }

    submit(form:NgForm){
        this.createContact();
    }

    createContact(){
        console.log("in create contact")
    }
}