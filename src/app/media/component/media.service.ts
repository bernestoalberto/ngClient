import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { map, catchError, debounceTime, tap, retryWhen, mergeMap, distinctUntilChanged } from 'rxjs/operators';
import { Observable, Subject, of, pipe, BehaviorSubject, range, timer, zip } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AngularFirestore, DocumentChangeAction } from '@angular/fire/firestore';
const INIT_DATA = {};
const BASE_URL = environment.BASE_URL + 'media';
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

@Injectable()
export class UploadService {
  private dataStore = new BehaviorSubject<any>(INIT_DATA);
  cast$: Observable<any> = this.dataStore.asObservable();
  constructor(private http: HttpClient, private db: AngularFirestore) { }

  private backoff(maxTries, ms) {
    return pipe(
      retryWhen(attempts => zip(range(1, maxTries), attempts)
        .pipe(
          map(([i]) => i * i),
          mergeMap(i => timer(i * ms))
        )
      )
    );
  }

  public getMedia(): Observable<any> {
    return this.http.get(`${BASE_URL}/all`, httpOptions).pipe(
      map((response: HttpResponse<any>) => response),
      tap(response => {
        this.dataStore.next(response);
      }),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(_ => of([]))
    );
  }
  public getMediaFireBaseDB(): Observable<DocumentChangeAction<any>[]> {
    return this.db.collection('media').snapshotChanges().pipe(
      map((response) => response),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(_ => of([]))
    );
  }
  public getMediaByMediaNo(id): Observable<any> {
    return this.http.get(`${BASE_URL}/getMediaById:${id}`, httpOptions).pipe(
      map((response: HttpResponse<any>) => response),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(_ => of([]))
    );
  }
  public createMedia(payload: {}): Observable<any> {
    return this.http.post(`${BASE_URL}/create`, payload, httpOptions).pipe(
      map((response: HttpResponse<any>) => response),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(_ => of([]))
    );
  }
  public updateMedia(payload): Observable<any> {
    return this.http.post(`${BASE_URL}/update:${payload.id}`, payload, httpOptions).pipe(
      map((response: HttpResponse<any>) => response),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(_ => of([]))
    );
  }
  public deleteMedia(id): Observable<any> {
    return this.http.post(`${BASE_URL}/delete:${id}`, httpOptions).pipe(
      map((response: HttpResponse<any>) => response),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(_ => of([]))
    );
  }
  public upload(files: Set<File>): { [key: string]: { progress: Observable<number> } } {

    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number> } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', `${BASE_URL}/upload`, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {

          // calculate the progress percentage
          const percentDone = Math.round(100 * event.loaded / event.total);

          // pass the percentage into the progress-stream
          progress.next(percentDone);
        } else if (event instanceof HttpResponse) {

          // Close the progress-stream if we get an answer form the API
          // The upload is complete
          progress.complete();
        }
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable()
      };
    });

    // return the map of progress.observables
    return status;
  }

}
