import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { map, catchError, tap, retry, debounceTime, delay, retryWhen, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { Observable, of, pipe, range, timer, zip } from 'rxjs';
import { Action } from '@ngrx/store';

// import {Service} from './service.model';

// import { environment } from 'src/environments/environment.prod';
let url = '';
@Injectable({
  providedIn: 'root'
})
export class TaxService {
  httpOptions = {
    observe: 'response',
    reportProgress: true,
    responseType: 'json',
    withCredentials: false
  };
  localData = [
    {
      id: 23, name: 'tax', description: 'tax return', price: 100,
      currency: 'USD', created_at: '2019 - 09 - 15T04: 00: 00.000Z', updated_at: null, deleted_at: null,
      sku: null, quantity: 0, category: 'NOTARY SIGNING AGENT ', link: '', service_id: 23
    },
    {
      id: 22, name: 'air pods', description: 'air pods', price: 145,
      currency: 'USD', created_at: '2019 - 09 - 04T04: 00: 00.000Z', updated_at: null, deleted_at: null, sku: null, quantity: 0,
      category: 'NOTARY SIGNING AGENT ',
      link: 'airpods.jpg\n', service_id: 2
    },
    {
      id: 21, name: 'pixel buds', description: 'pixel buds',
      price: 160, currency: 'USD', created_at: '2019 - 09 - 04T04: 00: 00.000Z', updated_at: null,
      deleted_at: null, sku: null, quantity: 0,
      category: 'NOTARY SIGNING AGENT',
      link: 'gbuds.jpg', service_id: 1
    }
  ];
  constructor(private httpClient: HttpClient) { }



  getServices(): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS,PATCH, DELETE  ,PUT',
        'Access-Control-Allow-Headers': 'Content-type, Accept, x-token, X-Key,Origin, X-Requested-With, Authorization',
        'Content-Type': 'application/json'
      }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    };
    // url = 'https://backend.eabonet.com/api/v1/services/services';
    url =  'api/v1/services/services';

    if (isDevMode()) {
      url = 'api/v1/services/services';

    }

    return this.httpClient.get(url, httpOptions).pipe(
      map((response: Response) => {
        return response;
      }),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(err => of([]))
    );

  }

  backoff(maxTries, ms) {
    return pipe(
      retryWhen(attempts => zip(range(1, maxTries), attempts)
        .pipe(
          map(([i]) => i * i),
          mergeMap(i => timer(i * ms))
        )
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getServiceByServiceNo(name): any {
    // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});

    url = 'https://backend.eabonet.com/services/find';

    if (isDevMode()) {
      // url = 'http://127.0.0.1:5000/services/services/find';
    }

    return this.httpClient.post(url, name).pipe(
      map((response: Response) => response.json())
      , catchError(err => of([]))
    );
  }
  getNextServiceID(table): Observable<any> {
    url = 'https://backend.eabonet.com/services/find';

    if (isDevMode()) {
      // url = 'http://127.0.0.1:5000/services/services/find';
      return of(this.localData[this.localData.length - 1].id + 1);
    } else {
      return this.httpClient.get(url + table).pipe(
        map((response: Response) => response.json()),
        catchError(err => of([])));
    }
  }
  createService(serviceData: any): any {

    if (isDevMode()) {
      // url = 'http://127.0.0.1:5000/api/v1/services/create_services';
      return of(this.localData.push(serviceData));
    } else {
      url = 'https://backend.eabonet.com/api/v1/services/create_services';

      // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
      if (serviceData.value) {
        return this.httpClient.post(url, serviceData.value).pipe(
          map((response: Response) => response.json()),
          catchError(err => of([]))
        );
      }
    }
  }
  updateService(serviceData: any): any {

    if (isDevMode()) {
      // url = 'http://127.0.0.1:5000/api/v1/services/update_services';
      const index = this.localData.indexOf(serviceData.id);
      this.localData[index] = serviceData;
      return of(this.localData);
    } else {
      //
      url = 'https://backend.eabonet.com/api/v1/services/update_services';
      // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
      return this.httpClient.post(url, serviceData).pipe(
        map((response: Response) => response.json()),
        catchError(err => of([]))
      );
    }
  }
  deleteServices(id): any {

    if (isDevMode()) {
      // url = 'http://127.0.0.1:5000/api/v1/services/update_services';
      const newArray = this.localData.filter(data => data.id !== id);
      return of(newArray);
    } else {
      url = 'https://backend.eabonet.com/services/delete_Service';
      // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
      return this.httpClient.post(url, id).pipe(
        map((response: Response) => response.json()),
        catchError(err => of([]))
      );
    }
  }
}

export interface Config {
  apiUrl: string;
  textfile: string;
}

