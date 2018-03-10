import{Component, OnInit} from '@angular/core'
import { Router, RouterLink, Params } from '@angular/router';
import { Userdetails } from '../service/userdetails';

@Component({
    selector: 'home',
    template:`<div>
        </div>`
})

export class HomeComponent implements OnInit{
    constructor(private _router:Router, private _userdetails:Userdetails){}

    ngOnInit(){
        if(!this._userdetails.isLoggedIn()){
            this._router.navigate(['/login']);
        } else if(this._userdetails.getUserType() === "admin"){
            this._router.navigate(['/admin']);
        }
        this._router.navigate(['/user']);
    }
}