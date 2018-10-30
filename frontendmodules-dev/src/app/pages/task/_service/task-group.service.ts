import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ApiService } from '../../../config/api.service';

@Injectable( /*{
  // providedIn: 'root'
}*/)
export class TaskGroupService {

  private subject = new Subject<any>();
  private groups = this.subject;
  private setname: any = []
  private setnamedict: any = {};


  constructor(
    private apiService: ApiService,
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
    this.apiService.getTaskGroups().subscribe(resp => {
      this.sendMessage(resp);
    });
    // console.log(this.group);
  }
  getTaskGroupTaskSet(){
    this.apiService.getTasks().subscribe(resp => {
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

/*
getCustomersById(id: string): Observable<Customer> {
  this.urlOption = AppConfig.urlOptions['customer']

  const url = `${this.apiUrl}/${this.urlOption}/${id}`;
  return this.http.get<Customer>(url).pipe(
    tap(() => LoggerService.log(`fetched customer id=${id}`)),
    catchError(CustomersService.handleError<Customer>(`getCustomer id=${id}`))
  );
}
*/
