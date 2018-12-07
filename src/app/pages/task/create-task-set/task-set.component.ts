import { Component, OnInit, OnDestroy, AfterViewInit, Input} from '@angular/core';
import { FormGroup, FormArray, FormControl, FormBuilder,  } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../_service/task-form-service.service';
import { ApiService } from '../../../config/api.service';
import {HttpClientService} from 'app/_services/http-client.service';
import { TaskGroupService } from '../_service/task-group.service';
import {MatDialog } from '@angular/material';
import { AddTaskGroupComponent } from '../add-task-group/add-task-group.component';
import {Todo, TodosForm, TaskForm} from '../_models';
import { Router} from '@angular/router';
import {AppConfig} from 'app/config/app.config';


@Component({
  selector: 'app-task-set',
  templateUrl: 'task-set.component.html',
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent implements OnInit, OnDestroy, AfterViewInit {

  // Message from task.component
  @Input() title: string;
  @Input() sentGroups: any;
  @Input() case: string;
  @Input() order: string;
  @Input() OrderTask: boolean = true;
  // end of message propery
  
  taskForm: FormGroup;
  taskFormSub: Subscription;

  // set_name: FormGroup;
  set_name: any;
  todos: FormArray;
  message: string;
  orderTask = {};
  updateName = false;
  masterGroupMessage: any;
  selectedId: any;
  updateId: string;

  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private httpClientService: HttpClientService,
    private tgs: TaskGroupService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router

  ) { this.getTaskGroup()}


  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroup();
    }
  ngAfterViewInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        this.todos = this.taskForm.get('todos') as FormArray;
        this.set_name = this.taskForm.get('set_name');
      });
    this.getTaskGroup();
    }
    ngOnDestroy() {

    } 
   
    addTodos() {
     this.taskFormService.addTodos();
    }
    deleteTodos(index: number) {
    this.taskFormService.deleteTodos(index);
    }
    setmasterGroupMessage(event) {
      let set_names = event.set_names;
      this.masterGroupMessage = set_names;
      this.clearTodosForm();

    }
    
      /**
   * After a form is initialized, we link it to our main form
   */

    saveTodos() {
      console.log('Todo saved!');
      console.log(this.taskForm.value);
      this.apiService.createTask(this.taskForm.value).subscribe(response => {
        console.log(response);
        this.taskFormService.clearTodos();
        this.tgs.getTaskGroups();
        this.getTaskGroup();
        });

    }
    getTodos(){
      this.apiService.getTaskDetail(this.selectedId).subscribe(todos => {
        console.log(todos['todos']);
        return this.todos = todos['todos'];
      });
    }
    

    clearTodosForm() {
      // this.taskFormService.clearForm();
      this.taskFormService.clearTodos();
    }
    getTaskGroup() {
      this.tgs.getMessage().subscribe(rsp => {
        this.sentGroups = rsp;
      });
    }
    openAddDialog() {
      const dialogRef = this.dialog.open(AddTaskGroupComponent, {
        width:'300px',
        height: '150px',
      });
      dialogRef.afterClosed().subscribe(rsp => {
        this.tgs.getTaskGroups();
        rsp = this.tgs.getMessage();
      });
    }
    getBlanketTask(id) {
      this.updateId = id;
      console.log(id, "NOW HERRRRRRRRRRRR", AppConfig.urlOptions.task + id + '/') 
      this.httpClientService.get(AppConfig.urlOptions.task + id + '/').subscribe(res => {
        console.log(res)
        this.clearTodosForm();
        if (this.taskForm.get('todos').value.length == 0) {
          const todos = res['todos'];
          for (const todo in todos) {
            if (todos.hasOwnProperty(todo)) {
              const todoslist =  todos[todo];
              // const currentTask = this.taskForm.getValue();
              const currentTodos = this.taskForm.get('todos') as FormArray;
              currentTodos.push(
              this.fb.group(
                new TodosForm(new Todo(todoslist['todo'], ))
                )
              );
            }
          } 
        };
      });
    }
    updateTodoSet() {
      let id = this.updateId
      this.apiService.updateTask(id, this.taskForm.value).subscribe(response => {
        console.log(response);
      });
      this.clearTodosForm();
      this.tgs.getTaskGroups();
      this.getTaskGroup();


    }
  }
/*
getBlanketTask(id) {
      this.taskFormService.getBlanketTask(id);
    }
*/