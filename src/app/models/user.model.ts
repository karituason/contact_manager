import { Contact } from "./contact.model";

export class User{
    constructor(
        public username:string,
        public firstname: string,
        public lastname: string,
        public numContacts: Number
    ){}
}