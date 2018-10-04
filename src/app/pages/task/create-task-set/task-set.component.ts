import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../_service/task-form-service.service';
import { ApiService } from '../../../config/api.service';
import { TaskGroupService } from '../_service/task-group.service';
import {MatDialog } from '@angular/material';
import { AddTaskGroupComponent } from '../add-task-group/add-task-group.component';



@Component({
  selector: 'app-task-set',
  template:
`
    <h1>Update Group Blanket Task</h1>

<!--  Task Group id: {{taskForm.controls.todos_group.value}} -->
  <br />
  <form [formGroup]="taskForm" >
    <!--<option [ngValue]="group" *ngFor="let group of mygroups">{{group.group_name}}</option>-->
    <mat-form-field class="form-element">
    <mat-select matInput  placeholder="Choose Group Set" formControlName='todos_group'>
      <mat-option *ngFor="let group of groups; let i=index" value={{group.id}}  (click)="changeGroup(group)">
        <span class="mat-option-text">{{group.group_name}}</span>
      </mat-option>
    </mat-select>
    </mat-form-field>
    <button  type="open" mat-button-raised color="accent" (click)="openAddDialog()">Add New Task Groups</button>

    <ng-template [ngIf]="isLoggedIn" [ngIfElse]="loggedOut">
      <div *ngFor="let sets of setNames">
        <mat-form-field class="form-element">
          <mat-select matInput  placeholder="Choose Boiler Plate Task" formControlName='set_name'>
            <mat-option *ngFor="let set of sets" value={{set.set_name}}  (click)="getBlanketTask(set.id)">
              <span class="mat-option-text">{{set.set_name}}</span>
            </mat-option>
          </mat-select>
        </mat-form-field>
       </div>
    </ng-template>
    <ng-template #loggedOut>
      <div>
        <h2>Set Name:</h2>
        <mat-form-field>
          <input matInput formControlName="set_name" placeholder="Add new set ">
        </mat-form-field>
      </div>
    </ng-template>

    <br />

    <h3>Add Tasks To Set</h3>
    <button mat-button-raised color="primary"(click)="addTodos()">Add Todos</button>
    <ul>
      <li *ngFor="let todo of todos?.controls; let i = index">
        <app-todos [index]="i" [todosForm]="todo" (deletePlayer)="deleteTodos($event)"></app-todos>
      </li>
    </ul>

    <button  type="submit" mat-button-raised color="accent" (click)="saveTodos()" [disabled]="taskForm.invalid">Submit</button>
    &nbsp;
    <button  type="submit" mat-button-raised color="accent" (click)="clearTodosForm()" style="indent:50px">Clear Form</button>
    <pre>Parent Form Status: <span class="status">{{taskForm.status}} <br />{{taskForm.value | json}}</span></pre>
  </form>
  <button  type="submit" mat-button-raised color="accent" (click)="consoleTaskGroups()">Task Groups</button>
  <div>
  <button  type="submit" mat-button-raised color="accent" (click)="getBlanketTask()">Blanket Task</button>
  </div>

  `,
  styleUrls: ['./task-set.component.scss']
})
export class TaskSetComponent implements OnInit, OnDestroy {

  taskForm: FormGroup;
  taskFormSub: Subscription;
  todos: FormArray;
  formInvalid: boolean = false;
  groupSub: Subscription;
  myControl = new FormControl();
  options: string[] = [];
  groups: Array<any> = [];
  selected: any;
  isLoggedIn = false;
  setNames: any;


  constructor(
    private taskFormService: TaskFormService,
    private apiService: ApiService,
    private tgs: TaskGroupService,
    private dialog: MatDialog,

  ) { this.getTaskGroup() }


  ngOnInit() {
    this.taskFormSub = this.taskFormService.taskForm$
    .subscribe(task => {
        this.taskForm = task;
        console.log(task);
        this.todos = this.taskForm.get('todos') as FormArray;
      });
    this.getTaskGroup();
    }

    ngOnDestroy() {
      this.taskFormSub.unsubscribe();
    }
    addTodos() {
    this.taskFormService.addTodos();
    }

    deleteTodos(index: number) {
    this.taskFormService.deleteTodos(index);
    }

    saveTodos() {
      console.log('Todo saved!');
      console.log(this.taskForm.value);
      this.apiService.createTask(this.taskForm.value).subscribe(response => {
        console.log(response);
        });
    }
    consoleTaskGroups() {
      this.taskFormService.consoleTaskGroups();
    }
    getBlanketTask(id) {
      this.taskFormService.getBlanketTask(id);
    }
    clearTodosForm() {
      this.taskFormService.clearForm();
    }
    getTaskGroup() {
      this.tgs.getMessage().subscribe(rsp => {
        this.groups = rsp;
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
    removeTag(event: any) {
      console.log(event.target.parentNode.value);
      console.log(event.target.value);
   }
   changeGroup(event){
     this.selected = event;
     this.isLoggedIn = true;
     let masterGrp = this.taskForm.controls.todos_group.value;
     let sectionObj = this.selected;
     console.log(sectionObj);
     if (JSON.stringify(sectionObj['id']) === masterGrp ) {
       console.log(sectionObj['set_names'])
       for (const set in sectionObj['set_names']) {
         let sets = []
         sets.push(sectionObj['set_names']);
         console.log("new set ",sets)
         // console.log(sectionObj['set_names'][set])
         console.log('you made it to step 2')
         this.setNames = sets
       }
      // console.log('getteing there')
     } else {
       //console.log('try again mike')
       //console.log(masterGrp)
     }
     return this.selected, this.setNames;
   }
   test(val) {
     console.log(val)
     return this.getBlanketTask(val)
   }
  }
