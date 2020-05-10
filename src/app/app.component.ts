import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './shared/animations';
import { SwPush, SwUpdate } from '@angular/service-worker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation],
})
export class AppComponent implements OnInit {
  readonly VAPID_PUBLIC_KEY = 'BLBx-hf2WrL2qEa0qKb-aCJbcxEvyn62GDTyyP9KTS5K7ZL0K7TfmOKSPqp8vQF0DaG8hpSBknz_x3qf5F4iEFo';
  // private newsletterService: NewsletterService

  constructor(private swPush: SwPush, private swUpdate: SwUpdate) { }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

        if (confirm('New version available. Load New Version?')) {

          window.location.reload();
        }
      });
    }
    setTimeout(()=>{
     this.subscribeToNotifications();
    },15000);
  }

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      // .then(sub => this.newsletterService.addPushSubscriber(sub).subscribe())
      .then(sub => console.log(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }
}
