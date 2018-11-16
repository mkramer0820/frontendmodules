import {Component, Inject, Injectable} from  '@angular/core';

import {MatDialogRef, MAT_DIALOG_DATA} from  '@angular/material';
import {HttpClientService} from '../../_services/http-client.service';

interface Data{
  url: string;
  id: number;
}

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent {

  constructor(
    private  dialogRef:  MatDialogRef<DeleteModalComponent>,
     @Inject(MAT_DIALOG_DATA) public  data:  Data,
    private httpClientSerivce: HttpClientService) {
  }
  public  closeDialog() {
      this.dialogRef.close();
  }
  
  delete() {
    let url = this.data.url;
    let id = this.data.id;
    console.log(url)
    this.httpClientSerivce.delete( url +  id ).subscribe();
  }
}

