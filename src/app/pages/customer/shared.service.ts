import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {Customer} from '../../modules/models/customer.model';

@Injectable({ providedIn: 'root' })
export class SharedService {
    public subject = new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ customer: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    }
}
