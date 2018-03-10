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
        phone: "",
        email: "",
    }
    btn_name:string = "Create";
    heading:string = "Contact"
    notValid:boolean = false;

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _route:ActivatedRoute, private _router: Router){

    }

    ngOnInit(){
        if(!this._userdetails.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetails.getUserType() === "admin"){
            this._router.navigate(['/admin']);
        }
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
        if(!form.invalid){
            if(this.contact.firstname === "" && 
                this.contact.lastname==="" &&
                (this.contact.phone ===null || this.contact.phone ==="") &&
                this.contact.email ==="") {

                    this.notValid = true;

            } else {
                this.notValid = false;
                 this.createContact();
            }
        }
    }

    createContact(){
        console.log("in create contact")
        this._httpprovider.httpReq('http://localhost:9001/user/contact/add','POST',
        {   username: this.contact.username,
            firstname: this.contact.firstname,
            lastname: this.contact.lastname,
            phone: this.contact.phone,
            email: this.contact.email
        },null)
            .subscribe((docs) =>{
                console.log(docs);
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