import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {TaskSet, SetItem} from '../../../modules/models/task.model';


@Component({
  selector: 'app-taskset',
  templateUrl: './taskset.component.html',
  styleUrls: ['./taskset.component.scss']
})
export class TasksetComponent implements OnInit {

  taskSetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

      /* Initiate the form structure */
      this.taskSetForm = this.fb.group({
        set_name: [],
        set_items: this.fb.array([this.fb.group({})])
      })
    }
    get setItems() {
       return this.taskSetForm.get('set_items') as FormArray;
    }
    addSetItem() {
      this.setItems.push(this.fb.group({}));
    }

    deleteSetItem(index) {
      this.setItems.removeAt(index);
    }
}
