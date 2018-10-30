import { ApiService } from './../../config/api.service';
import { Injectable }       from '@angular/core';
 
import { FormDropdown } from '../_models/form-dropdown';
import { FormBase }     from '../_models/form-base';
import { FormTextbox }  from '../_models/form-textbox';
import {Observable, /*of, throwError as observableThrowError*/ } from 'rxjs';
import {Todo, TaskSet} from '../_models/task-models/task.models';

@Injectable({
  providedIn: 'root'
})
export class TaskFormService {

  dropdownOption: any;

  constructor(
    private api: ApiService,
  ) { this.dropdownOption = this.getTaskGroups();
      console.log("your options are ", this.dropdownOption);
   }

  getTaskGroups() {
    const options = [];
    this.api.getTasks().subscribe((taskSet: TaskSet) => {
      const keys = Object.keys(taskSet[0]);
      const value = Object.values(taskSet);
      for (const set in taskSet) {
        let optiond = {}
        optiond['key'] = taskSet[set].id;
        optiond['value'] = taskSet[set].set_name;
        options.push(optiond);
      }
    });
    this.dropdownOption = options;
    return this.dropdownOption;
  }
  getForms2() {
    let tasks: FormBase<any>[] = [
 
      new FormDropdown({
        key: 'set_name',
        label: 'Task Set name',
        options: this.dropdownOption,
        order: 4
      })
    ];

    return tasks;
  }

  printOptions() {
    console.log(this.dropdownOption);
  }
  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getForms() {
 
    let tasks: FormBase<any>[] = [
 
      new FormDropdown({
        key: 'brave',
        label: 'Bravery Rating',
        options: [
          {key: 'solid',  value: 'Solid'},
          {key: 'great',  value: 'Great'},
          {key: 'good',   value: 'Good'},
          {key: 'unproven', value: 'Unproven'}
        ],
        order: 3
      }),
 
      new FormTextbox({
        key: 'firstName',
        label: 'First name',
        value: 'Bombasto',
        required: true,
        order: 1
      }),
 
      new FormTextbox({
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2
      })

    ];
 
    return tasks.sort((a, b) => a.order - b.order);
  }
}



