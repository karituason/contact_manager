import {Injectable} from '@angular/core';

export interface userdetails{
    username:string,
    password:string,
    userType: string,
    loggedin: boolean
}

@Injectable()

export class Userdetails implements userdetails {
    public username: string = null;
    public password: string = null;
    public userType: string = null;
    public loggedin: boolean = false;
    constructor(){}
    isLoggedIn(){return this.loggedin;}
    getUserType(){return this.userType;}
    getUserName(){return this.username;}

    getUserdetails(){
        return{username: this.username, 
            password: this.password,
            userType: this.userType,
            loggedin: this.loggedin
        }
    }
    resetData(){
        this.username = null;
        this.password = null;
        this.userType = null;
        this.loggedin = false;
    }
    setDetails(data: any){
        this.username = data.username;
        this.password = data.password;
        this.userType = data.userType;
        this.loggedin = true;
    }
}