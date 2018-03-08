import { Component, OnInit } from '@angular/core';
import {RouterModule, Router, RouterLink} from '@angular/router';
import { Http, Response, Request,RequestMethod, Headers} from '@angular/http';
import { NgForm } from '@angular/forms';

import {Httpprovider} from '../service/httpprovider.service';
import { Userdetails } from '../service/userdetails';

@Component({
  selector: 'cm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public user: any = {username:"", password:""};
  constructor(private _httpprovider:Httpprovider, private _userdetails:Userdetails, private _router: Router) { 
    if((this._userdetails.isLoggedIn()) || (this._userdetails.getUserType() !== null)){
      if(this._userdetails.getUserType() === "user" ||this._userdetails.getUserType() === "admin"){
            this._userdetails.resetData();
            this._router.navigate( ['/login'] );
      }
  }
  }

  login(form:NgForm){
    console.log("in log in");
    this._httpprovider
        .httpReq('http://localhost:9001/login', 
            'POST',
            {username:this.user.username, password:this.user.password},
            null)
        .subscribe((data)=>{
          let vari = this;
          if (data.username !== null || data.username !== undefined ||
              data.userType !== undefined){
                vari._userdetails.setDetails(data);
                if (vari._userdetails.getUserType() === 'admin'){
                  vari._router.navigate(['/admin']);
                } else if (vari._userdetails.getUserType() === 'user'){
                  vari._router.navigate(['/user']);
                }
              }
        })
  }
}
