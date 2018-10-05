import { Component, OnInit } from '@angular/core';
import { TaskFormService } from '../_service/task-form.service';

@Component({
  selector: 'app-jp-forms',
  template:
  `
    <div>
      <h2>Job Application for Heroes</h2>
      <app-jp-dynamic-form [forms]="forms"></app-jp-dynamic-form>
    </div>
  `,
  styleUrls: ['./jp-forms.component.scss'],
  providers: [TaskFormService]
})
export class JpFormsComponent implements OnInit {

  forms: any[];

  constructor(service: TaskFormService) {
    this.forms = service.getForms();
  }
  ngOnInit() {
  }

}
