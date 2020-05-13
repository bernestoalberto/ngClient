import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './shared/animations';
import { SwPush, SwUpdate } from '@angular/service-worker';
import {NewsletterService} from './_services/message.service';
import { environment } from 'src/environments/environment';
import { PushNotificationsService} from 'ng-push-ivy';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = environment.VAPID_PUBLIC_KEY;
  private newsletterService: NewsletterService;
  title = 'Web push Notifications!';

  constructor(private swPush: SwPush, private swUpdate: SwUpdate, private _pushNotifications: PushNotificationsService ) {
    this._pushNotifications.requestPermission();
   }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
     this.subscribeToNotifications();
    // this.notify();
  }
  notify(){
    const options = {
      body: `The truth is, I'am Iron Man!`,
      icon: 'assets/images/ironman.png'
    }
     this._pushNotifications.create('Iron Man', options).subscribe(
        res =>{
        if (res.event.type === 'click') {
            // You can do anything else here
            res.notification.close();
        }
        console.log(res)
        },
        err => console.log(err)
    );
  }
  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        this.newsletterService.addPushSubscriber(sub).subscribe()
      })
      .then(sub => console.log(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
