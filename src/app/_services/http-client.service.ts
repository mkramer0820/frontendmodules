import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppConfig } from '../config/app.config';


@Injectable({ providedIn:'root' })
export class HttpClientService {
  BASE_URL = AppConfig.base;
  //BASE_URL = 'http://104.248.10.237/'

  constructor(private http: HttpClient) { }

  get(url: string, options?: any): Observable<ArrayBuffer> {
    return this.http.get(`${this.BASE_URL}${url}`, options);
  }

  post(url: string, body: any, options?: any): Observable<ArrayBuffer> {
    return this.http.post(`${this.BASE_URL}${url}`, body, options);
  }

  put(url: string, body: any, options?: any) {
    return this.http.put(`${this.BASE_URL}${url}`, body, options);
  }

  delete(url: string, options?: any): Observable<ArrayBuffer> {
    return this.http.delete(`${this.BASE_URL}${url}`, options);
  }

  options(url, options?: any): Observable<ArrayBuffer> {
    return this.http.options(`${this.BASE_URL}${url}`, options);
  }

  private updateUrl(req: string) {
    return environment.apiUrl + req;
  }
}

