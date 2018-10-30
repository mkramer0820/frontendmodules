import { Component, OnInit } from '@angular/core';
export type EditorType = 'customer';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  editor: EditorType = 'customer';

  get addCustomer() {
    return this.editor === 'customer';
  }

  toggleEditor(type: EditorType) {
    this.editor = type;
  }
  constructor() { }

  ngOnInit() {
  }

}
