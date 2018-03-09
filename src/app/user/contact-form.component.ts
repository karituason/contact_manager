import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink, ActivatedRoute} from '@angular/router';
import { Http, Response, Request,RequestMethod, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';

import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({
    selector:'cm-contact-form',
    templateUrl: './contact-form.component.html'

})

export class ContactFormComponent implements OnInit{
    contact:any = {
        username:"",
        firstname:"",
        lastname:"",
        phone: null,
        email: "",
    }
    btn_name:string = "Save";
    heading:string = "Update Contact"

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _route:ActivatedRoute, private _router: Router){

    }

    ngOnInit(){
        this.contact.username = this._userdetails.username;
        this._route
            .queryParams
            .subscribe(params =>{
                this.contact.firstname = params['firstname'];
                this.contact.lastname = params['lastname'];
                this.contact.phone = params['phone'];
                this.contact.email = params['email']
                this.heading = "Update Contact";
                this.btn_name = "Save";
            })


        console.log(this.heading)
    }

    cancel(){
        this._router.navigate(['/user/contact'],
        {queryParams: {username:this.contact.username,
            firstname:this.contact.firstname,
            lastname:this.contact.lastname,
            phone:this.contact.phone,
            email:this.contact.email}});
    }

    submit(form:NgForm){
        this.updateContact();
    }

    updateContact(){
        console.log("in update contact")
    }

}