import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../config/api.service';

@Component({
  selector: 'app-orders-image-upload',
  templateUrl: './orders-image-upload.component.html',
  styleUrls: ['./orders-image-upload.component.scss']
})
export class OrdersImageUploadComponent implements OnInit {

  selectedFile: File;

  constructor( private http: ApiService,) { }

  ngOnInit() {
  }

  onFileChanged(event) {
    const file = event.target.files[0]
  }
  onUpload() {
  // this.http is the injected HttpClient
  const uploadData = new FormData();
  uploadData.append('myFile', this.selectedFile, this.selectedFile.name);
  this.http.uploadSweaterImg(uploadData)
  }
}
