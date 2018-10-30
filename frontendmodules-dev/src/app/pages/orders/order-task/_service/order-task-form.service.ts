import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { OrderTaskForm } from '../_models/order-task-form';
import { OrderTask } from '../_models/order-task';
import { OrderTaskTodosForm } from '../_models/order-task-todo-form';
import {OrderTaskGroups} from '../_models';
import { OrderTaskTodo } from '../_models/order-task-todo';
import { ApiService } from '../../../../config/api.service';
import { map, take } from 'rxjs/operators';


@Injectable()
export class OrderTaskFormService {

  public ordertaskGroups: any ;
  ordertaskGroups$: any = this.ordertaskGroups;
  // public taskGroup$: Observable<Task[]> = this.taskGroups.asObservable();

  private ordertaskForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(new OrderTaskForm(new OrderTask(''))));
  ordertaskForm$: Observable<FormGroup> = this.ordertaskForm.asObservable();



  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    // this.getTaskGroups(); use for old
    // console.log(this.ordertaskGroups); use for old
    this.ordertaskGroups = this.getTaskGroups();
      console.log('your options are :', this.ordertaskGroups);
   }

  addTodos() {
    const currentOrderTask = this.ordertaskForm.getValue();
    const currentOrderTaskTodos = currentOrderTask.get('todos') as FormArray;

    currentOrderTaskTodos.push(
      this.fb.group(
        new OrderTaskTodosForm(new OrderTaskTodo())
      )
    );

    this.ordertaskForm.next(currentOrderTask);
  }

  deleteTodos(i: number) {
    const currentOrderTask = this.ordertaskForm.getValue();
    const currentOrderTaskTodos = currentOrderTask.get('todos') as FormArray;

    currentOrderTaskTodos.removeAt(i);
    this.ordertaskForm.next(currentOrderTask);
  }
  /*
  getTaskGroups() {
    return this.apiService.getTaskGroups()
    .subscribe(taskGroup => this.ordertaskGroups = taskGroup);
  }*/
  consoleTaskGroups() {
    const currentOrderTask = this.ordertaskForm.getValue();
    const currentGroupName = currentOrderTask.get('todos_group').value;
    this.ordertaskForm.getValue().get('todos_group').setValue(this.ordertaskGroups[0].id);
    console.log(this.ordertaskGroups[0].id, currentGroupName);
  }
  clearForm() {
    const currentOrderTask = this.ordertaskForm.getValue();
    const currentOrderTaskTodos = currentOrderTask.get('todos') as FormArray;
    while (currentOrderTaskTodos.length !== 0) {
        currentOrderTaskTodos.removeAt(0);
        console.log('current task is: ' , currentOrderTask);
      }
  }
  clearTodos() {
    const currentOrderTask = this.ordertaskForm.getValue();
    const currentOrderTaskTodos = currentOrderTask.get('todos') as FormArray;
    while (currentOrderTaskTodos.length !== 0) {
      console.log(currentOrderTaskTodos.value);
      currentOrderTaskTodos.removeAt(0);
      console.log('length is ', currentOrderTaskTodos.length);
   }
 }
 getTaskGroups() {
  const options = [];
  this.apiService.getTaskGroups().subscribe((taskSet: OrderTaskGroups) => {
    const keys = Object.keys(taskSet[0]);
    const value = Object.values(taskSet);
    for (const set in taskSet) {
      let optiond = {}
      optiond['group_name'] = taskSet[set].group_name;
      optiond['id'] = taskSet[set].id;
      optiond['set_names'] = taskSet[set].set_names;
      options.push(optiond);
      }
    });
  return this.ordertaskGroups = options;
  }

}
