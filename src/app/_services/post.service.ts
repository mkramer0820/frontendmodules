import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientXsrfModule, HttpEvent, HttpResponse} from '@angular/common/http';
import {Headers} from '@angular/http';
import {AppConfig} from '../config/app.config';
import {Observable}  from 'rxjs';
import { AuthenticationService } from '.././pages/_services';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseurl = 'http://127.0.0.1:8000/';
  private endpoint: string;
  private credential: any;
  private token = localStorage.getItem('currentUser');


  constructor( private httpClient: HttpClient, private endPoint: string, private auth: AuthenticationService ) {
    this.credential = this.auth.updateData(this.token);
     }

 /*   getConfigResponse(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(
      this.configUrl, { observe: 'response' });
  }*/


  post(urlendpoint, data) {
    let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('content-type', 'application/json');
    headers.append('user_id', this.credential['user_id']);
    headers.append('Authorization', this.credential.values);

    this.httpClient.post(`${this.baseurl}/${urlendpoint}/`, data).subscribe(response => console.log(response));
   }
}
