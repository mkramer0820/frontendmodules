import { Component, OnInit, Input } from '@angular/core';
import { HttpClientService } from 'app/_services/http-client.service';

interface Data {
  update: boolean;
}

@Component({
  selector: 'app-sweater-size',
  templateUrl: './sweater-size.component.html',
  styleUrls: ['./sweater-size.component.scss']
})
export class SweaterSizeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
