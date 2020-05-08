import { GoogleChartsBaseService } from './google-charts.base.service';
import { Injectable } from '@angular/core';
import { PieChartConfig, PieChart } from './PieChartConfig';
import { map, catchError,  debounceTime, tap, retryWhen, mergeMap, distinctUntilChanged, shareReplay } from 'rxjs/operators';
import { Observable, of, pipe, range, timer, zip, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from '../../environments/environment';
declare var google: any;

const INIT_DATA = {};
const BASE_URL = environment.BASE_URL + 'reports';
const reportData: PieChart[] = [{
  data: [['Task', 'Hours per Day'],
  ['Eat', 3],
  ['Commute', 2],
  ['Youtube Tutorials', 5],
  ['Meditate', 4],
  ['Sleep', 10]],
  config: new PieChartConfig('My December 2019 stats ', 0.4),
  elementId: 'myPieChart1'
},
{
  data: [['Task', 'Hours per Day'],
  ['Work', 11],
  ['Eat', 2],
  ['Commute', 2],
  ['Workout', 2],
  ['Sleep', 7]],
  config: new PieChartConfig('My January 2020 stats', 0.4),
  elementId: 'myPieChart2'
}];
@Injectable()
export class GooglePieChartService extends GoogleChartsBaseService {
  private dataStore = new BehaviorSubject<any>(INIT_DATA);
  cast$: Observable<any> = this.dataStore.asObservable();
  httpOptions = {
    observe: 'response',
    reportProgress: true,
    responseType: 'json',
    withCredentials: false
  };

  constructor(private httpClient: HttpClient) { super(); }

  public BuildPieChart(elementId: string, data: any[], config: PieChartConfig): void {
    const chartFunc = () => new google.visualization.PieChart(document.getElementById(elementId));
    const options = {
      title: config.title,
      pieHole: config.pieHole,
    };

    this.buildChart(data, chartFunc, options);
  }
  loadData(/*params: any*/): Observable<PieChart[]> {
  /*  const httpOptions = {
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
    return this.httpClient.get(`${BASE_URL}/${params}` , httpOptions).pipe(
      tap(response => {
        this.dataStore.next(response);
      }),
      map((response: HttpResponse<any>) =>  response),
      shareReplay(),
      this.backoff(3, 250),
      debounceTime(5000),
      distinctUntilChanged(),
      catchError(err => of([]))
    );*/
    return of(reportData);
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
}
