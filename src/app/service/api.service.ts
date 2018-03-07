import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Contact} from '../models/contact.model';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()

export class APIService{

    private _apiUrl ="api/users/users.json";

    constructor(private _http:Http){}
    
    getUsers():Observable<User[]>{
        return this._http.get(this._apiUrl)
            .map((response:Response)=> <User[]>response.json())
            .catch(this.handleError);
    }

    private handleError(error:Response){
        return Observable.throw(error.json().error||"Server Error");
    }
}
