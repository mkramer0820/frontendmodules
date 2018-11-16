import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../../_service/task-form-service.service';
@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.scss']
})
export class TaskUpdateComponent implements OnInit {

  taskForm: FormGroup;
  taskFormSub: Subscription;
  todos: FormArray;
  formInvalid: boolean = false;


  constructor(private taskFormService: TaskFormService) { }


  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
      })
    }
    ngOnDestroy() {
      this.taskFormSub.unsubscribe()
    }
    addTodos() {
    this.taskFormService.addTodos()
    }

    deleteTodos(index: number) {
    this.taskFormService.deleteTodos(index)
    }

   
  }
