import {Component, Inject, Injectable} from  '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'

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
  deleteForm: FormGroup;
  disabled: boolean = true;

  constructor(
    private  dialogRef:  MatDialogRef<DeleteModalComponent>,
     @Inject(MAT_DIALOG_DATA) public  data:  Data,
    private httpClientSerivce: HttpClientService) {
      this.deleteForm = new FormGroup({
        delete: new FormControl()
      })
  }
  public  closeDialog() {
      this.dialogRef.close();
  }
  
  delete() {
    let valid = this.deleteForm.get('delete').value.toLowerCase();
    if (valid === 'delete') {
      this.disabled = true;
      let url = this.data.url;
      let id = this.data.id;
      console.log(url)
      this.httpClientSerivce.delete( url +  id ).subscribe(response => {
        this.closeDialog();

      });
    }
  }


}

