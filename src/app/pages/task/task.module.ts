import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskComponent} from './task.component';
import {TaskSetComponent} from './create-task-set/task-set.component'
import {TodosComponent} from './create-task-set/todos/todos.component';
import {TaskUpdateComponent} from './create-task-set/task-update/task-update.component';
import {SharedModule} from 'app/shared/shared.module';
import {AddTaskGroupComponent} from './add-task-group/add-task-group.component';
import {TaskFormService} from './_service/task-form-service.service';
import {TaskGroupService} from './_service/task-group.service';
 

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    TaskSetComponent,
    TaskComponent,
    TaskUpdateComponent,
    TodosComponent,
    AddTaskGroupComponent,
  ],
  providers: [
    TaskGroupService,
    TaskFormService
  ]
})
export class TaskModule { }
