import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-cards',
  templateUrl: './order-cards.component.html',
  styleUrls: ['./order-cards.component.scss']
})
export class OrderCardsComponent implements OnInit {

  @Input() tasks: any;
  @Input() avatar: string;

  constructor() { }

  ngOnInit() {

  }

}
