import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../config/api.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { TaskGroup } from '../_models/task-group.model'
import { first } from 'rxjs/operators';
import {  MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material';

@Component({
  selector: 'add-task-group',
  template:
`
<div class="container" *ngIf="!post; else forminfo" novalidate>
  <form [formGroup]="formGroup" (ngSubmit)="onSubmit(formGroup.value)" class="form">

  <mat-form-field class="form-element">
    <input matInput placeholder="Group Name" formControlName="group_name">
    <mat-error *ngIf="!name.valid && name.touched">
      {{ titleAlert }}
    </mat-error>
  </mat-form-field>
  </form>
  <button  type="submit" mat-button-raised color="accent"  (click)="addTaskGroup()">Create Task Group </button>

</div>
{{this.formGroup.value | json}}

`
  ,
  styleUrls: ['./add-task-group.component.scss']
})
export class AddTaskGroupComponent implements OnInit {
  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  error = '';
  taskGroupForm = this.fb.group({
    group_name: [''],
  });
  task: TaskGroup;

  /////////////
  // snabar  //
  ////////////
  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';


  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
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
  addTaskGroup(){
    const task = this.formGroup.value
    console.log(task)
    this.api.addTaskGroups(task)
      .pipe(first())
      .subscribe(
        (error:string) => {
          this.error=error;
          console.log('yoyo',this.error);
        },
        rsp => {
          // console.log(rsp);
          this.error = 'Group with this name already exists';
          console.log('yoyo',this.error);
          this.openSnackBar(this.error)
          this.formGroup.reset();
    });
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
    return this.formGroup.get('group_name') as FormControl
  }

}
