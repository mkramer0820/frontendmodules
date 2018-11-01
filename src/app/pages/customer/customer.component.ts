import { Component, OnInit } from '@angular/core';
export type EditorType = 'customer';
@Component({
  selector: 'app-customer',
  template: `customer comp`,
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
