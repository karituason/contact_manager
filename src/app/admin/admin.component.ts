import {Component, OnInit} from '@angular/core';
import { User } from '../models/user.model';
import { Contact } from '../models/contact.model';
import {APIService} from '../service/api.service';
import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';
import { Router, RouterLink } from '@angular/router';

@Component({
    selector:'cm-admin',
    templateUrl:'./admin.component.html'
})

export class AdminComponent implements OnInit{
    users:User[];
    errorMessage:string;

    constructor(private _httpprovider:Httpprovider, private _userdetail:Userdetails, private _router:Router){

    }

    ngOnInit(){
        if(!this._userdetail.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetail.getUserType() === "user"){
            this._router.navigate(['/user']);
        } else {
            this._httpprovider.httpReq('http://localhost:9001/admin/users', 'GET', {}, null)
                .subscribe((users) => {
                    this.users = users;
                },
                (error) => {
                    this.errorMessage=<any>error;
                }
            );
        }
    }

    logout():void{
        this._router.navigate(['login']);
    }

    createUser():void{
        //goes to form
        console.log(this._userdetail)
    }

    deleteUser():void{

    }

    updateUser():void{
        //goes to form
    }
    
}