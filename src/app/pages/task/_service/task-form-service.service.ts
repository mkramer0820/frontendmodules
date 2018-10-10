import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { TaskForm } from '../_models/task-form';
import { Task } from '../_models/task.model';
import { TodosForm } from '../_models/todos-form.model';
import { Todo } from '../_models/todos.model';
import { ApiService } from '../../../config/api.service';
import { map, take } from 'rxjs/operators';



@Injectable()
export class TaskFormService {

  private taskGroups: any;
  private taskDetail: any;
  // public taskGroup$: Observable<Task[]> = this.taskGroups.asObservable();

  private taskForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(new TaskForm(new Task(''))));
  taskForm$: Observable<FormGroup> = this.taskForm.asObservable();

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
  ) {
    this.getTaskGroups();
    console.log(this.taskGroups)
   }

  addTodos() {
    const currentTask = this.taskForm.getValue();
    const currentTodos = currentTask.get('todos') as FormArray;

    currentTodos.push(
      this.fb.group(
        new TodosForm(new Todo())
      )
    );

    this.taskForm.next(currentTask);
  }

  deleteTodos(i: number) {
    const currentTask = this.taskForm.getValue();
    const currentTodos = currentTask.get('todos') as FormArray;
    currentTodos.removeAt(i);
    this.taskForm.next(currentTask);
  }
  getTaskGroups() {
    return this.apiService.getTaskGroups().subscribe(taskGroup => this.taskGroups = taskGroup);
  }
  consoleTaskGroups() {
    const currentTask = this.taskForm.getValue();
    const currentGroupName = currentTask.get('todos_group').value;
    this.taskForm.getValue().get('todos_group').setValue(this.taskGroups[0].id);
    console.log(this.taskGroups[0].id, currentGroupName);
  }
  getBlanketTask(id) {
    this.apiService.getTaskDetail(id).subscribe(res => {
      console.log(this.taskForm.getValue());
      const todos = res['todos'];
      for (const todo in todos) {
        if (todos.hasOwnProperty(todo)) {
          const todoslist =  todos[todo];
          const currentTask = this.taskForm.getValue();
          const currentTodos = currentTask.get('todos') as FormArray;
          currentTodos.push(
          this.fb.group(
            new TodosForm(new Todo(todoslist['todo'], ))
          )
        );
        this.taskForm.next(currentTask);
        } else {
        console.log('field');
        }
      }
    });
  }
  clearForm() {
    const currentTask = this.taskForm.getValue();
    const currentTodos = currentTask.get('todos') as FormArray;
    while (currentTodos.length !== 0) {
        currentTodos.removeAt(0);
        console.log('current task is: ' , currentTask);
      }
  }
  clearTodos() {
    const currentTask = this.taskForm.getValue();
    const currentTodos = currentTask.get('todos') as FormArray;
    while (currentTodos.length !== 0) {
      console.log(currentTodos.value);
      currentTodos.removeAt(0);
      console.log('length is ', currentTodos.length);
   }
 }
}
