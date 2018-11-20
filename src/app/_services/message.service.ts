import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
    public subject = new Subject<any>();
    public username = new Subject<string>();

    public url = new Subject<any>();

    sendMessage(message) {
        this.subject.next( message );
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    }


    sendUrl(message) {
        this.url.next( message );
    }

    clearUrl() {
        this.url.next();
    }

    getUrl() {
        return this.url.asObservable();
        //return this.customer.asObservable();
    }

    sendUsername() {
        this.username = JSON.parse(localStorage.getItem('currentUser'));

    }
    getUsername() {
        return this.username;
    }
    clearUserName() {
        this.username.next();
    }

}
