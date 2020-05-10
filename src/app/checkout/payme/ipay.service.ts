import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map, catchError,  debounceTime, tap, retryWhen, mergeMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Observable, of, pipe, range, timer, zip, BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
const INIT_DATA = {};
const BASE_URL = environment.BASE_URL + 'services';
@Injectable({
  providedIn: 'root'
})
export class IpayService {
  private dataStore = new BehaviorSubject<any>(INIT_DATA);
  cast$: Observable<any> = this.dataStore.asObservable();
  httpOptions = {
    observe: 'response',
    reportProgress: true,
    responseType: 'json',
    withCredentials: false
  };
  constructor(private httpClient: HttpClient, private db: AngularFirestore) { }

  getServices(limit = 5): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS,PATCH, DELETE  ,PUT',
        'Access-Control-Allow-Headers': 'Content-type, Accept, x-token, X-Key,Origin, X-Requested-With, Authorization',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }),
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit', // include, *same-origin, omit
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // no-referrer, *client
    };



    return this.httpClient.get(`${BASE_URL}/${limit}` , httpOptions).pipe(
      tap(response => {
        this.dataStore.next(response);
      }),
      map((response: HttpResponse<any>) =>  response),
      shareReplay(),
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
  public getServicesFireBaseDB(): Observable<DocumentChangeAction<any>[]> {
    return this.db.collection('service').snapshotChanges().pipe(
      map((response) => response),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(err => of([]))
    );
  }
  getServiceByServiceNo(name): any {
    return this.httpClient.post(`${BASE_URL}/find`, name).pipe(
      map((response: Response) => response.json())
      , catchError(err => of([]))
    );
  }
  getNextServiceID(table): Observable<any> {
    return this.httpClient.get(`${BASE_URL}/find` + table).pipe(
      map((response: Response) => response.json()),
      catchError(err => of([])));

  }
  createService(serviceData: any): any {
      // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
      if (serviceData.value) {
        return this.httpClient.post(`${BASE_URL}}/create_services`, serviceData.value).pipe(
          map((response: Response) => response.json()),
          catchError(err => of([]))
        );
        }
  }
  updateService(serviceData: any): any {
      // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
      return this.httpClient.post(`${BASE_URL}/update_services`, serviceData).pipe(
        map((response: Response) => response.json()),
        catchError(err => of([]))
      );

  }
  deleteServices(id): any {
      // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
      return this.httpClient.post(`${BASE_URL}/delete_Service`, id).pipe(
        map((response: Response) => response.json()),
        catchError(err => of([]))
      );
    }
  }


export interface Config {
  apiUrl: string;
  textfile: string;
}

