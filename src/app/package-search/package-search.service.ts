import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from './../../environments/environment';

const BASE_URL = environment.BASE_URL + 'services';
@Injectable({
  providedIn: 'root'
})
export class PackageSearchService {
 queryUrl = '?search=';

 constructor(private http: HttpClient) { }

 search(terms: Observable<string>): Observable<string> {
  return terms.pipe(
    debounceTime(400),
    distinctUntilChanged(),
    switchMap(term => this.searchEntries(term))
  );
 }
 searchEntries(term) {
  return this.http.
  get(BASE_URL + this.queryUrl + term).pipe(
  map((res ) => JSON.stringify(res)));
 }
}
