import { ApiService } from './../../../config/api.service';
import { Component, OnInit } from '@angular/core';
import { TaskFormService, FactoryFormService, OptionsService } from '../../_service/';
import { FormBase }     from '../../_models/form-base';
import { FormTextbox }  from '../../_models/form-textbox';

@Component({
  selector: 'app-factory-base-form',
  template:
  `
<div>
  <app-jp-dynamic-form [models]="models"></app-jp-dynamic-form>
</div>
`,
  styleUrls: ['./factory-base.component.scss'],
  providers: [FactoryFormService]
})
export class FactoryBaseComponent implements OnInit {


  models1: any[];
  models: any;

  constructor(
    // private factoryFormService: FactoryFormService,
    private factoryFormService: OptionsService,
    ) {
    // this.tasks = service.getTaskGroups();
    this.models = this.getForm();
  }
  ngOnInit() {
  }

  getForm() {

    this.factoryFormService.optionsRequest().subscribe(response => {
      let factory: FormBase<any>[] = [];
      let options = response['actions']['POST'];
     // console.log(this.options);

      for (const item in options) {
        if (options[item].hasOwnProperty('type')) {
          console.log(options[item]);
          let optionJson = options[item];
          let textbox = new FormTextbox({
            key: item,
            label: optionJson['label'],
            type: 'text'
          });
          factory.push(textbox);
        } else { console.log(item, "oops") }

      }
      return factory;
    });
  }

  

}
