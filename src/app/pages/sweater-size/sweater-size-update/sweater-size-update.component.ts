import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {AppConfig} from 'app/config/app.config';
import { HttpClientService } from 'app/_services/http-client.service';

interface SweaterSize {
  id: number;
  size_type: string;
  size_detail: string;
}

@Component({
  selector: 'app-sweater-size-update',
  templateUrl: './sweater-size-update.component.html',
  styleUrls: ['./sweater-size-update.component.scss']
})
export class SweaterSizeUpdateComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
