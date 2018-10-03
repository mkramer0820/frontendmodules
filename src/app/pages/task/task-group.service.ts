import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../../config/api.service';

@Injectable( /*{
  // providedIn: 'root'
}*/)
export class TaskGroupService {

  private subject = new Subject<any>();
  private groups = this.subject;
  private group: any;

  constructor(
    private apiService: ApiService,
  ) {
    this.getTaskGroups();
    this.getMessage().subscribe(rsp => {
      this.group = rsp;
      console.log(this.group);
    });
   }


  sendMessage(groups) {
      this.subject.next(groups);
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
      //return this.customer.asObservable();
  }
  getTaskGroups() {
    this.apiService.getTaskGroups().subscribe(resp => {
      // console.log(resp);
      return this.sendMessage(resp);
      // this.group = resp;
    });
    // console.log(this.group);
  }
}
