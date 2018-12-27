import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskGroup } from '../_models/task-group.model'
import { first } from 'rxjs/operators';
import {  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material';
import {TaskGroupService} from '../_service/task-group.service';
import { HttpClientService } from '@app/_services/http-client.service';
import {AppConfig} from 'app/config/app.config';
@Component({
  selector: 'add-task-group',
  template:
`
<div class="container" novalidate>
  <form [formGroup]="formGroup" (ngSubmit)="onSubmit()" class="form">

  <mat-form-field class="form-element">
    <input matInput placeholder="Group Name" formControlName="group_name">
    <mat-error *ngIf="!name.valid && name.touched">
      {{ titleAlert }}
    </mat-error>
  </mat-form-field>
  </form>
  <button  type="submit" mat-button-raised color="accent"  (click)="onSubmit()">Create Task Group </button>

</div>

`
  ,
  styleUrls: ['./add-task-group.component.scss']
})
export class AddTaskGroupComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  error = '';
  success = '';
  taskGroupForm = this.fb.group({
    group_name: [''],
  });
  task: TaskGroup;

  /////////////
  // snabar  //
  ////////////
  // message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = false;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private http: HttpClientService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private tgs: TaskGroupService,
  ) {this.taskGroupForm = this.fb.group({
      'group_name': new FormControl(''),
     })

    }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate();

  }
  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }
  onSubmit(){
    const task = this.formGroup.value;
    console.log(task);
    this.http.post(AppConfig.urlOptions.taskGroup, task)
      .pipe(first())
      .subscribe(
        (error:string) => {
          this.error = error;
        },
        rsp => {        
          this.error = 'Group with this name already exists';
          this.formGroup.reset();
          this.openSnackBar('Group Created');
          this.tgs.getTaskGroups();

        });
        this.openSnackBar('Group Created');
  }
  createForm() {
  this.formGroup = this.fb.group({
    'group_name': [null, [Validators.required, Validators.minLength(1)]],
    });
  }
  setChangeValidate() {
    this.formGroup.get('group_name').setValidators([Validators.required, Validators.minLength(1)]);
    this.titleAlert = "You need to specify at least 1 characters";
  }
  get name() {
    return this.formGroup.get('group_name') as FormControl;
  }

}
