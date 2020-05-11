import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError, retryWhen, mergeMap } from 'rxjs/operators';
import { Observable, of, pipe, range, timer, zip, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
const INIT_DATA = {};
const BASE_URL = environment.BASE_URL + 'subscriber';
@Injectable({
  providedIn: 'root'
})
@Injectable()
export class NewsletterService {
  private dataStore = new BehaviorSubject<any>(INIT_DATA);
  public permission: Permission;
  messages: string[] = [];
  cast$: Observable<any> = this.dataStore.asObservable();
  httpOptions = {
    observe: 'response',
    reportProgress: true,
    responseType: 'json',
    withCredentials: false
  };
  constructor(private httpClient: HttpClient) {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public isSupported(): boolean {
    return 'Notification' in window;
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
  add(message: string) {
    this.messages.push(message);
  }
  clear() {
    this.messages = [];
  }
  addPushSubscriber(payload: any): Observable<any> {
    // const options = new RequestOptions ({headers: new HttpHeaders({'x-token': this.authService.token})});
    if (payload) {
      return this.httpClient.post(`${BASE_URL}}/addSubscriber`, payload).pipe(
        map((response: Response) => response.json()),
        catchError(_ => of([]))
      );
      }
}
create(title: string, options ? : PushNotification): any {
  const self = this;
  return new Observable((obs) => {
      if (!('Notification' in window)) {
          console.log('Notifications are not available in this environment');
          obs.complete();
      }
      if (self.permission !== 'granted') {
          console.log(`The user hasn't granted you permission to send push notifications`);
          obs.complete();
      }
      const _notify = new Notification(title, options);
      _notify.onshow = (e)=> {
          return obs.next({
              notification: _notify,
              event: e
          });
      };
      _notify.onclick = (e)=> {
          return obs.next({
              notification: _notify,
              event: e
          });
      };
      _notify.onerror = (e) => {
          return obs.error({
              notification: _notify,
              event: e
          });
      };
      _notify.onclose = ()=> {
          return obs.complete();
      };
  });
}

requestPermission(): void {
  const self = this;
  if ('Notification' in window) {
      Notification.requestPermission((status) =>{
          return self.permission = status;
      });
  }
}
generateNotification(source: Array < any > ): void {
  const self = this;
  source.forEach((item) => {
      const options = {
          body: item.alertContent,
          icon: '../resource/images/bell-icon.png'
      };
       self.create(item.title, options).subscribe();
  })
}
}

export declare type Permission = 'denied' | 'granted' | 'default';
export interface PushNotification {
    body ? : string;
    icon ? : string;
    tag ? : string;
    data ? : any;
    renotify ? : boolean;
    silent ? : boolean;
    sound ? : string;
    noscreen ? : boolean;
    sticky ? : boolean;
    dir ? : 'auto' | 'ltr' | 'rtl';
    lang ? : string;
    vibrate ? : number[];
}
