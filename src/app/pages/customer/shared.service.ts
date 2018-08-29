import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Customer} from '../../modules/models/customer.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
    public subject = new Subject<any>();

    sendMessage(customer) {
        this.subject.next( customer );
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    }
}
