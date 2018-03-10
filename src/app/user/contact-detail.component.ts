import {Component, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';
import {APIService} from '../service/api.service';
import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';
import { Router, RouterLink, Params, ActivatedRoute } from '@angular/router';

@Component({
    selector:'cm-contactdetail',
    templateUrl:'./contact-detail.component.html'
})

export class ContactDetailComponent implements OnInit{
    contact:any = {
        username: "holder",
        firstname: "holder",
        lastname: "holder",
        phone: 1234567890,
        email: "holder@hold.hol"
    }

    constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails,private _route:ActivatedRoute, private _router:Router){
        
    }

    ngOnInit():void{
        if(!this._userdetails.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetails.getUserType() === "admin"){
            this._router.navigate(['/admin']);
        }
        this._route
            .queryParams
            .subscribe(params=>{
                this.contact.username = params['username'];
                this.contact.firstname = params['firstname'];
                this.contact.lastname = params['lastname'];
                this.contact.phone = params['phone'];
                this.contact.email = params['email'];
            })
        console.log(this.contact);
    }

    back(){
        this._router.navigate(['/user'],
            {queryParams: {
                username:this.contact.username
            }}
        );
    }

    deleteContact(){
        console.log("deleting: " + this.contact.firstname);
        this._httpprovider.httpReq('http://localhost:9001/user/contact/delete','POST',{
            username: this.contact.username,
            firstname: this.contact.firstname,
            lastname: this.contact.lastname,
            phone: this.contact.phone,
            email: this.contact.email,
        },null).subscribe((data)=>{
            this._router.navigate(['/user']);
        })
        
    }

    editContact(){
        this._router.navigate(['/user/contact-form'], 
            {queryParams: {
                username: this.contact.username,
                firstname: this.contact.firstname,
                lastname:this.contact.lastname,
                phone: this.contact.phone,
                email: this.contact.email
            }})
    }

}

