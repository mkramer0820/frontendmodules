import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClientService } from '@app/_services/http-client.service';
import {AppConfig} from 'app/config/app.config';

@Injectable( /*{
  // providedIn: 'root'
}*/)
export class TaskGroupService {

  private subject = new Subject<any>();
  private groups = this.subject;
  private setname: any = []
  private setnamedict: any = {};


  constructor(
    private http: HttpClientService,
  ) {
    this.getTaskGroups();
    this.getMessage();
    console.log(this.groups);
    this.getTaskGroupTaskSet()
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
    this.http.get(AppConfig.urlOptions.taskGoup).subscribe(resp => {
      this.sendMessage(resp);
    });
    // console.log(this.group);
  }
  getTaskGroupTaskSet(){
    this.http.get(AppConfig.urlOptions.task).subscribe(resp => {
      let array = [];
      let setnameEnum = {};
      for (let item in resp) {
        let key = resp[item];
        if (key['set_name'] == null) {
          console.log(key['id'])
        } else {
        setnameEnum[key['id']] = key['set_name'];
        array.push(resp[item]);
        this.setname.push(resp[item]['set_name'])
        }
      }
      this.setnamedict = setnameEnum;
      return this.setname, this.setnamedict
    });
  }
  getDetailTgs() {
    console.log("Get Detail TGS: ", this.groups)
  }
}