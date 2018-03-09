import{Component, OnInit} from '@angular/core'
import { Router, RouterLink, Params } from '@angular/router';

@Component({
    selector: 'admin-refresh',
    template:`<div>
        </div>`
})

export class AdminRedirectComponent implements OnInit{
    constructor(private _router:Router){}

    ngOnInit(){
        console.log("in refresh")
        this._router.navigate(['/admin'])
    }
}