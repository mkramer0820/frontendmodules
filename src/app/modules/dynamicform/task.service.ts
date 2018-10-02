import { Injectable, OnInit } from '@angular/core';

import { TaskBase }     from './models/task-base';
import { TaskTextbox }  from './task-textbox';
import { ApiService } from '../../config/api.service';
import { HttpClient /*, HttpHeaders*/} from '@angular/common/http';
// import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TaskService {

  API_URL = 'http://127.0.0.1:8000';

  constructor(
    // private httpClient: HttpClient,
    private api: ApiService,
  ) {}
  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getTasks() {

    let task: TaskBase<any>[] = [

      new TaskTextbox({
      key: 'name',
      label: 'name',
      value: 'frankie',
      required: true,
      id: 1
     }),
     new TaskTextbox({
       key: 'emailAddress',
       label: 'Email',
       type: 'email',
       id: 2
     }),

     new TaskTextbox({
       key: 'emailAddress',
       label: 'Email',
       type: 'email',
       id: 3

     })
   ];

   return task.sort((a, b) => a.order - b.order);
  }
}
/////////////////////////
//       work on     ///
///////////////////////
/*
  getTaskDetail() {
    const id = '14'
    return this.api.getTaskDetail(id).subscribe(tasks => {
      for (var v[0] in tasks)
      {
        var val= JSON.stringify(v);
        var key = JSON.stringify(tasks[v]);
        console.log(val,key)
      }
    });
  }
  */
