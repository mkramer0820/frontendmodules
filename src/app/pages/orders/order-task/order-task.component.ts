import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder,  } from '@angular/forms';
import { ApiService } from '../../../config/api.service';
import { Subscription } from 'rxjs';
import { OrderTaskFormService } from './_service/order-task-form.service';
import {OrderTaskTodo, OrderTaskTodosForm, OrderTaskForm} from './_models';


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
  masterGroupMessage: any;y


  constructor(
    private orderTFS: OrderTaskFormService,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
  this.ordertaskFormSub = this.orderTFS.ordertaskForm$
  .subscribe(task => {
      this.ordertaskForm = task;
      this.orderTodos = this.ordertaskForm.get('todos') as FormArray;
      this.setName = this.ordertaskForm.get('set_name');
    });
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
    let set_names = event.set_names;
    this.masterGroupMessage = set_names;
    //console.log(message);
  }

  //  TODO: ADD ORDER TASK CREATE TO API
  /*
  saveTodos() {
    this.apiService.createOrderTask(this.taskForm.value).subscribe(response => {
      console.log(response);
      });
    this.clearTodosForm();
    this.getTaskGroup();
  }*/
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

}
