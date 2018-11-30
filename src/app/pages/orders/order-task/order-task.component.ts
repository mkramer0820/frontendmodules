import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder,  } from '@angular/forms';
import { ApiService } from '../../../config/api.service';
import { Subscription } from 'rxjs';
import { OrderTaskFormService } from './_service/order-task-form.service';
import {OrderTaskTodo, OrderTaskTodosForm, OrderTaskForm} from './_models';
import { Order } from '../../../modules/models/orders.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';



export interface DialogData {
  url: string;
  formData?: any;
  update: boolean;
  order: any;
}
@Component({
  selector: 'app-order-task',
  templateUrl: './order-task.component.html',
  styleUrls: ['./order-task.component.scss']
})
export class OrderTaskComponent implements OnInit {

  ordertaskForm: FormGroup;
  ordertaskFormSub: Subscription;
  orderTodos: FormArray;
  setName: any;
  masterGroupMessage: any;
  ordertaskGroupsSub: Subscription;
  ordertaskGroups: any;
  setNames: any;
  statusOption= ['NA', 'Started', 'Complete'];
  // @Input() order: any;
  order = this.data.order;
  update= this.data.update;
  updateId: any;
  selectedOrderTask: any;
  isActive: boolean;


  constructor(
    private orderTFS: OrderTaskFormService,
    private apiService: ApiService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: DialogData

  ) {}

  ngOnInit() {
  this.ordertaskFormSub = this.orderTFS.ordertaskForm$
  .subscribe(task => {
      this.ordertaskForm = task;
      this.orderTodos = this.ordertaskForm.get('todos') as FormArray;
      this.setName = this.ordertaskForm.get('set_name');
    });
  this.ordertaskGroups = this.orderTFS.ordertaskGroups;
  console.log('you got these task groups form service: ', this.ordertaskGroups);
  }


  ///// ADD and Delete todos parent--> child/////
  addOrderTodos() {
    this.orderTFS.addTodos();
  }
  deleteTodos(index: number) {
    this.orderTFS.deleteTodos(index);
  }
  ///used in the dropdown
  setmasterGroupMessage(event) {
    this.ordertaskForm.get('order').setValue(this.data.order.id);
    let set_names = event.set_names;
    this.masterGroupMessage = set_names;
    console.log('message', this.masterGroupMessage);
  }
  getBlanketTask(id) {
    this.apiService.getTaskDetail(id).subscribe(res => {
      this.orderTFS.clearForm();
      if (this.ordertaskForm.get('todos').value.length == 0) {
        const todos = res['todos'];
        for (const todo in todos) {
          if (todos.hasOwnProperty(todo)) {
            const todoslist =  todos[todo];
            // const currentTask = this.taskForm.getValue();
            const currentTodos = this.ordertaskForm.get('todos') as FormArray;
            currentTodos.push(
            this.fb.group(
              new OrderTaskTodosForm(new OrderTaskTodo(todoslist['todo'], ))
            )
          );
          } else {
          console.log('field');
          }
        }
      } else {
        console.log('error');
      }
    });
  }
  updateBlanketTask(selectedtodos) {
    const todos =  selectedtodos;
    this.selectedOrderTask = selectedtodos;
    this.updateId = selectedtodos['id'];
    this.orderTFS.clearForm();
    if (this.ordertaskForm.get('todos').value.length === 0) {
      for (const todo in todos) {
        if (todos.hasOwnProperty(todo)) {
          const todoslist =  todos[todo];
          // const currentTask = this.taskForm.getValue();
          const currentTodos = this.ordertaskForm.get('todos') as FormArray;
          currentTodos.push(
          this.fb.group(
            new OrderTaskTodosForm(
              new OrderTaskTodo(todoslist['todo'],todoslist['comment'], todoslist['duedate'], todoslist['status']  ))
          )
        );
        } else {console.log('field'); }
      }
    }
  }
  setOrderAndGroup(event) {
    this.updateId = event.id;
    this.isActive = event.isActive;
    this.ordertaskForm.get('order').setValue(event.order);
    this.ordertaskForm.get('todos_group').setValue(event.todos_group);
    this.ordertaskForm.get('set_status').setValue(event.set_status);
    this.ordertaskForm.get('isActive').setValue(event.isActive);
  }
  //  TODO: ADD ORDER TASK CREATE TO API

  createOrderTask() {
    this.apiService.addTaskToOrder(this.ordertaskForm.value).subscribe(response => {
      console.log(response);
      });
    this.orderTFS.clearForm();
  }
  updateOrderTask() {
    this.apiService.updateOrderTask(this.ordertaskForm.value, this.updateId ).subscribe(response => {
      this.orderTFS.clearForm();
    });
  }

}
  /*
  addOrdertASK(id) {
    const task = this.ordertaskForm.value;
    this.apiService.addTaskToOrder(task).subscribe(response => {
      console.log(response);
      });
  }
  /* TODO :: UPDATE ORDER TAK function
  updateOrderTask() {
    this.apiService.updateTask(this.selectedId, this.taskForm.value).subscribe(response => {
      console.log(response);
    });
    this.clearTodosForm();
    this.router.navigate(['task-component']);
  }*/


