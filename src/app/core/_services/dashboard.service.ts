import { Injectable } from '@angular/core';
import { ApiService } from '../../config/api.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private api: ApiService) { }

  getDashBoardTask(task: any): <tasks> {
    this.api.getDashBoardTask()
    .pipe(map())
    .subscribe()
  }
}
