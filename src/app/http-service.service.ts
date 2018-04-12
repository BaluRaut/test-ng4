import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpService {
  constructor (
    protected httpClient: HttpClient,
  ) {}
  public get(url: string): Observable<any> {
    return this.httpClient.get<any>(`${url}`);
  }

}
