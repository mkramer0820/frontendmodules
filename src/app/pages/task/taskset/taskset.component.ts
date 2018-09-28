import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {TaskGroup, Todos} from '../../../modules/models/task.model';
import {ApiService} from '../../../config/api.service';

@Component({
  selector: 'app-taskset',
  templateUrl: './taskset.component.html',
  styleUrls: ['./taskset.component.scss']
})
export class TasksetComponent implements OnInit {

  todosForm: FormGroup;
  gettodos: any[];

  constructor(
    private fb: FormBuilder,
    private http: ApiService,
  ) { }

  ngOnInit() {

      /* Initiate the form structure */
      this.todosForm = this.fb.group({
        todos_group: [],
        todos: this.fb.array([this.fb.group({
          todo:'',
          duedate:'',
          comment:''
        })
      ])
    });
    this.getAllTasks()
  }
    ///////// Accessor For Selling Points ////////
  get taskTodos() {
    return this.todosForm.get('todos') as FormArray;
  }
  ///////////End ////////////////

  /////// Add Forms /////////////////

  addTodo() {
    this.taskTodos.push(this.fb.group({
      todo:'',
      duedate:'',
      comment:''
    })
  );
  }
  deleteTodo(index) {
    this.taskTodos.removeAt(index);
  }
  saveSet(){
    let todos = this.todosForm.get('todos').value;
    let todos_group = this.todosForm.get('todos_group').value;
    let newtask = {todos_group, todos};

    console.log(newtask)
    this.http.createTask(newtask).subscribe(response => {
      console.log(response)
      })
    }
    getHttpOptions() {
      this.http.taskOptions();
    }
    getAllTasks() {
      return this.http.getTasks().subscribe(response => {
        console.log(response)
      })
  }
    //////////// End ////////////////////
}
