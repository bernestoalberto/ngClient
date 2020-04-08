import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  constructor(private http: HttpClient) { }


  addPushSubscriber(sub: any) {
    return this.http.post('/api/v1/subscriber/notifications', sub);
}

send() {
    return this.http.post('/api/v1/newsletter/newsletter', null);
}
}
