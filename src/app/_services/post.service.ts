import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientXsrfModule, HttpEvent, HttpResponse} from '@angular/common/http';
import {Headers} from '@angular/http';
import {AppConfig} from '../config/app.config';
import {Observable}  from 'rxjs';
import { AuthenticationService } from '.././pages/_services';
import { headersToString } from 'selenium-webdriver/http';

@Injectable()
export class PostService {

  private baseurl = 'http://127.0.0.1:8000/';
  private endpoint: any;
  private credential: any;
  private token = localStorage.getItem('currentUser');


  constructor( private httpClient: HttpClient, private auth: AuthenticationService ) {
    this.credential = this.auth.updateData(this.token);
    }

 /*   getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }*/


  post(urlendpoint, data) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('content-type', 'application/json');
    let token = JSON.parse(this.token)
    headers = headers.append('Authorization',  `Bearer ${token}`);
    console.log(headers);
   // this.httpClient.post(`${this.baseurl}/${urlendpoint}/`, data).subscribe(response => console.log(response));
   }
}
