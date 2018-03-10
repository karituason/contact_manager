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
    notValid:boolean

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _route:ActivatedRoute, private _router: Router){

    }

    ngOnInit(){
        if(!this._userdetails.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetails.getUserType() === "admin"){
            this._router.navigate(['/admin']);
        }
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
        if (!form.invalid){
            console.log(this.contact);
            if(this.contact.firstname === "" && 
                this.contact.lastname==="" &&
                (this.contact.phone ===null || this.contact.phone ==="") &&
                this.contact.email ==="") {

                    this.notValid = true;

            } else {
                this.notValid = false;
                 this.updateContact();
            }
        }

    }

    updateContact(){
        console.log("in update contact")
        this._httpprovider.httpReq('http://localhost:9001/user/contact/update','POST',
        {   username: this.contact.username,
            firstname: this.contact.firstname,
            lastname: this.contact.lastname,
            phone: this.contact.phone,
            email: this.contact.email
        },null)
            .subscribe((docs) =>{
                this._router.navigate(['/user/contact'],{
                    queryParams:{
                        username:this.contact.username,
                        firstname:this.contact.firstname,
                        lastname:this.contact.lastname,
                        phone:this.contact.phone,
                        email:this.contact.email}
                })

            })
    }

}