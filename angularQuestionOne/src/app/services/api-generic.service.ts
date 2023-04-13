import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiGenericService {
  constructor(private httpClient: HttpClient) {}

  public get(url = ''): Observable<any> {
    return this.httpClient.get(url);
  }

  public post(url = '', body: any = ''): Observable<any> {
    return this.httpClient.post(url, body);
  }

  public delete(url = ''): Observable<any> {
    return this.httpClient.delete(url);
  }
}
