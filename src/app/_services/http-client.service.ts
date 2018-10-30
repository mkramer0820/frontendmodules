import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const BASE_URL = 'http://127.0.0.1:8000/';

@Injectable({ providedIn:'root' })
export class HttpClientService {
  BASE_URL = 'http://127.0.0.1:8000/';

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

