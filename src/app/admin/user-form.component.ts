import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink} from '@angular/router';
import { Http, Response, Request,RequestMethod, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';

import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({

})

export class UserFormComponent implements OnInit{
    user:any = {
        username:"",
        password:"",
        firstname:"",
        lastname:"",
        numContacts:0,
        update:"false"
    }

    ngOnInit(){
        
    }

    createUser(){

    }

    updateUser(){
        
    }

}