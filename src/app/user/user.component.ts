import {Component, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';
import {APIService} from '../service/api.service';
import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';
import { Router, RouterLink, Params } from '@angular/router';

@Component({
    selector:'cm-user',
    templateUrl:'./user.component.html'
})

export class UserComponent implements OnInit{
    user:User;
    contacts:Contact[];
    errorMessage:string;

    constructor(private _httpprovider:Httpprovider, private _userdetail:Userdetails, private _router:Router){

    }

    ngOnInit(){
        if(!this._userdetail.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetail.getUserType() === "admin"){
            this._router.navigate(['/admin']);
        } else {
            this._httpprovider.httpReq('http://localhost:9001/admin/userdetail', 'POST', {username:this._userdetail.username}, null)
                .subscribe((users) => {
                    this.user = users;
                    this.user.username = this._userdetail.username;
                },
                (error) => {
                    this.errorMessage=<any>error;
                }
            );
            this._httpprovider.httpReq('http://localhost:9001/user/contacts', 'POST', {username:this._userdetail.username}, null)
                .subscribe((contacts) => {
                    
                    this.contacts = contacts
                },
                (error) => {
                    this.errorMessage=<any>error;
                }
            );

        }
    }

    logout(){
        this._router.navigate(['/login']);
    }

    createContact(){
        this._router.navigate(['/user/create-contact'])
    }

    deleteContact(fn:string, ln:string, p:Number, e:string){
        console.log("deleting: "+ this._userdetail.username + " "+ fn+ " "+ln+ " "+p+ " "+e);
        this._httpprovider.httpReq('http://localhost:9001/user/contact/delete','POST',{
            username: this._userdetail.username,
            firstname: fn,
            lastname: ln,
            phone: p,
            email: e,
        },null).subscribe((data)=>{
            this._httpprovider.httpReq('http://localhost:9001/admin/userdetail', 'POST', {username:this._userdetail.username}, null)
                .subscribe((users) => {
                    this.user = users;
                },
                (error) => {
                    this.errorMessage=<any>error;
                }
            );
            this._httpprovider.httpReq('http://localhost:9001/user/contacts', 'POST', {username:this._userdetail.username}, null)
                .subscribe((contacts) => {
                    this.contacts = contacts
                    
                },
                (error) => {
                    this.errorMessage=<any>error;
                }
            );
        })
    }

    updateContact(contact:Contact){
        this._router.navigate(['/user/contact-form'], 
            {queryParams: {
                username: contact.username,
                firstname: contact.firstname,
                lastname:contact.lastname,
                phone: contact.phone,
                email: contact.email
            }})
    }
}