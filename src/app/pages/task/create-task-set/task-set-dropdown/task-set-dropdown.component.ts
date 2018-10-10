import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaskFormService } from '../../_service/task-form-service.service';
import { ApiService } from '../../../../config/api.service';
import { TaskGroupService } from '../../_service/task-group.service';
import {MatDialog } from '@angular/material';
import { AddTaskGroupComponent } from '../../add-task-group/add-task-group.component';

@Component({
  selector: 'app-task-set-dropdown',
  templateUrl: './task-set-dropdown.component.html',
  styleUrls: ['./task-set-dropdown.component.scss']
})
export class TaskSetDropdownComponent implements OnInit {

  @Input() masterGroupMessage: any;
  @Output() formReady = new EventEmitter<FormGroup>();
  @Input() selectedid: any;
  setNamesForm: FormGroup;
  list: any[] = [];
  taskForm: FormGroup;

  constructor(

  ) {
    this.taskForm = new FormGroup({
      set_name: new FormControl()
   });
  }

  ngOnInit() {
    this.parseMessage();
    
  }

 
  parseMessage() {
    // let list: string[] = [];
    for (let option in this.masterGroupMessage) {
      return this.list.push(this.masterGroupMessage[option]);
    }
    // return this.list.push(list);
  }
}
