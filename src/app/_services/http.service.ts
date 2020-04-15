import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
const config = {
  api: {
    uri: 'https://backend.eabonet.com',
    port: '5000',
    path: '/api/v1'
  }
};


@Injectable()
export class HttpService {
  private urlRoot: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    const host = location.host;
    this.urlRoot = config.api.uri + ':' + config.api.port + config.api.path;
    if (host.indexOf('localhost') >= 0) {
      this.urlRoot = 'https://backend.eabonet.com:5000/api/v1';
    }
  }

  private _createAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      Authorization: 'my-auth-token',
      'Access-Control-Allow-Origin': '*'

    });

    if (this.authService.info) {
      headers.set('x-token', this.authService.token);
    }

    return headers;
  }

  public get(url: string, options?: HttpRequest<any>) {
    return this._request('GET', url, null, options);
  }

  public post(url: string, body: string, options?: HttpRequest<any>) {
    return this._request('POST', url, body, options);
  }

  public put(url: string, body: string, options?: HttpRequest<any>) {
    return this._request('PUT', url, body, options);
  }

  public delete(url: string, options?: HttpRequest<any>) {
    return this._request('DELETE', url, null, options);
  }

  public options(url: string, options?: HttpRequest<any>) {
    return this._request('OPTIONS', url, null, options);
  }
  private _request(method, relativeUrl: string, body?: string, options?: any): Observable<any> {
    const url = this.urlRoot + relativeUrl;
    return this.http.request(url, method, {
      body,
      headers: new HttpHeaders(Object.assign({
        withCredentials: this._createAuthHeaders(),
      }))
    }
    );
  }
}
