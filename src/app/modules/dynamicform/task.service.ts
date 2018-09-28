import { Injectable, OnInit } from '@angular/core';

import { TaskBase }     from './models/task-base';
import { TaskTextbox }  from './task-textbox';
import { ApiService } from '../../config/api.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {

  API_URL = 'http://127.0.0.1:8000';

  constructor(
    private httpClient: HttpClient,
    private api: ApiService,
  ) {}
  ngOnInit() {
    this.getTaskDetail()
  }
  public todos = new Subject<any>();

  sendTodos(todos) {
      this.todos.next( todos );
  }
  clearTodos() {
      this.todos.next();
  }
  getTodos(): Observable<any> {
    let test = this.todos.asObservable();
      console.log(test)
      return this.todos.asObservable();
      //return this.customer.asObservable();
  }
  getTaskDetail() {
    const id = '13'
    return this.api.getTaskDetail(id).subscribe(task => {
      //console.log(task)
      this.sendTodos(task)
    })
  }
  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getTasks() {

   let task: TaskBase<any>[] = [

     new TaskTextbox({
       key: 'firstName',
       label: 'First name',
       value: 'Bombasto',
       required: true,
       id: 1
     }),
     new TaskTextbox({
       key: 'emailAddress',
       label: 'Email',
       type: 'email',
       id: 2
     })
   ];

   return task.sort((a, b) => a.order - b.order);
  }
}
