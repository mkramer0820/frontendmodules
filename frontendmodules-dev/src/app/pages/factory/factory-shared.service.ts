import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
//import {Customer} from '../../modules/models/customer.model';

@Injectable({ providedIn: 'root' })
export class FactorySharedService {
    public subject = new Subject<any>();

    sendMessage(factory) {
        this.subject.next( factory );
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
        //return this.customer.asObservable();
    }
}
