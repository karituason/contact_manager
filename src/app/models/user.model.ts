import { Contact } from "./contact.model";

export class User{
    constructor(
        public username:string,
        public password:string,
        public role:string,
        public name:string,
        public contacts:Contact[]
    ){}
}