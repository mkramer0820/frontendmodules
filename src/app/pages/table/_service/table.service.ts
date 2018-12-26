import { Injectable } from '@angular/core';
import {BehaviorSubject, pipe, Observable} from 'rxjs';
import {filter, map, combineLatest} from 'rxjs/operators';
import { Result, Ipaginator } from '../_models/ipaginator';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {AppConfig} from 'app/config/app.config';
import {compbineLates} from 

@Injectable({
  providedIn: 'root'
})
export class TableService {

  base = AppConfig.base
  url = AppConfig.base + AppConfig.urlOptions.orders

  tablePageData$ = new BehaviorSubject<{}>({currentPage : Number})
  private tableDataSource$ = new BehaviorSubject<Result[]>([])
  private displayedColumns$ = new BehaviorSubject<String[]>([])
  public dataSource = this.tableDataSource$.asObservable();
  public displayColumns = this.displayedColumns$.asObservable();



  constructor(private http: HttpClient ) {  
  }

  getPaginatorOrder() {
  return this.http.get(this.url)
    .pipe(map((orders: Result[]) => {
      let cols = Object.keys(orders[0])
      return {orders, cols}
    }))
    .subscribe(response => {
      console.log(response)
      this.tableDataSource$.next(response.orders);
      this.displayedColumns$.next(response.cols);
    })
  }

  changeSource(orders: Result[]) {
    return this.tableDataSource$.next(orders)

  }
  getDataSource(): Observable<Result[]> {
    return this.dataSource
    //return this.customer.asObservable();
}
}
