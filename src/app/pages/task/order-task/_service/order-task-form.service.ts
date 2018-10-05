/*
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { OrderTaskForm, OrderTask, OrderTodosForm, OrderTodo } from '../_models';
import { ApiService } from '../../../../config/api.service';
import { map, take } from 'rxjs/operators';
import {TaskFormService} from '../../_service/task-form-service.service';


@Injectable({
  providedIn: 'root'
})
export class OrderTaskFormService {
  private taskGroups: any;
  private taskDetail: any;

  private orderTaskForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(new OrderTaskForm(new OrderTask(''))));
  orderTaskForm$: Observable<FormGroup> = this.orderTaskForm.asObservable();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private tfs: TaskFormService,
  ) { }

  addOrderTodos() {
    const currentOrderTask = this.orderTaskForm.getValue();
    const currentOrderTodos = currentOrderTask.get('todos') as FormArray;

    currentOrderTodos.push(
      this.fb.group(
        new OrderTodosForm(new OrderTodo())
      )
    );
  }
  deleteOrderTodos(i: number) {
    const currentTask = this.orderTaskForm.getValue();
    const currentTodos = currentTask.get('todos') as FormArray;
    currentTodos.removeAt(i);
    this.orderTaskForm.next(currentTask);
  }
  //get task master task groups using original service
  getMasterTaskGroups() {
    this.apiService.getTaskGroups();
  }
}



///////////////////
// serivce model//
/////////////////

export class OrderTaskGroup {
  id: number;
  group_name: string;
  set_name: string;
  todos: Todo[];
  todos_group: number;
}

export class Todo {
  todo: string;
  comment?: string;
}



*/