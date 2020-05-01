import { Injectable /* , isDevMode*/ } from '@angular/core';
import { Observable, of, pipe, range, timer, BehaviorSubject, zip } from 'rxjs';
import { map, catchError, debounceTime, tap, delay, switchMap, retryWhen, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel, FireUser } from './../user/user.model';
import { environment } from '../../environments/environment';
import * as firebase from 'firebase';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { GlobalConstants } from './../shared/global-constants';

const hoursFromNow = (n) => new Date(Date.now() + n * 1000 * 60 * 60).toISOString();

const INIT_DATA = {};
const BASE_URL = environment.BASE_URL + 'auth';

// Get the auth token from the service.
const authToken = localStorage.getItem('token') || 'tnt';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${authToken}`,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS,PATCH, DELETE  ,PUT',
    'Access-Control-Allow-Headers': 'Content-type, Accept, Origin, Authorization',
    'Content-Type': 'application/json'
  }),
  mode: 'no-cors',
  cache: 'no-cache',
  credentials: 'omit', // include, *same-origin, omit
  redirect: 'follow', // manual, *follow, error
  referrer: 'no-referrer', // no-referrer, *client
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  public token: string;
  gapi = GlobalConstants.gapi;
  public info: string;
  private dataStore = new BehaviorSubject<any>(INIT_DATA);
  data$: Observable<any> = this.dataStore.asObservable();
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  calendarItems: any[];
  // private loginUrl: any = '';
  user$: Observable<FireUser>;
  constructor(private http: HttpClient, private router: Router, private afAuth: AngularFireAuth, private afs: AngularFirestore
  ) {
    this.initStorage();
    this.initClient();
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<FireUser>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);

        }
      })
    );
  }
  registerUser(user) {
    return this.http.post<any>(`${BASE_URL}/register`, user);
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
  getAuthorizationToken() {
    return localStorage.getItem('token');
  }
  login(user): any {
    return this.http.post<any>(`${BASE_URL}/loginP`, user, httpOptions).pipe(
      delay(1000),
      map((response: HttpResponse<any>) => response),
      debounceTime(5000),
      catchError(err => of([])));
  }
  loginUserFire(user) {
    return this.http.post<any>(`${environment.firebase.BASE_URL}/verifyPassword?key=
                                  ${environment.firebase.apiKey}`, user).pipe(
      delay(1000),
      map((response: HttpResponse<any>) => response),
      debounceTime(5000),
      catchError(err => of([]))
    );
  }

   // Get user data
   getUserData(oobCode) {
    return this.http.post<any>(`${environment.firebase.BASE_URL}lookup?key=
                               ${environment.firebase.apiKey}`, oobCode).pipe(
      delay(1000),
      map((response: HttpResponse<any>) => response),
      debounceTime(5000),
      catchError(err => of([]))
    );
  }
   // Confirm email vertification

   emailVerification(oobCode) {
    return this.http.post<any>(`${environment.firebase.BASE_URL}update?key=
                               ${environment.firebase.apiKey}`, oobCode).pipe(
      delay(1000),
      map((response: HttpResponse<any>) => response),
      debounceTime(5000),
      catchError(err => of([]))
    );
  }
  // Verify Password

  verifyPassword(oobCode) {
    return this.http.post<any>(`${environment.firebase.BASE_URL}resetPassword?key=
                               ${environment.firebase.apiKey}`, oobCode).pipe(
      delay(1000),
      map((response: HttpResponse<any>) => response),
      debounceTime(5000),
      catchError(err => of([]))
    );

  }

  // Confirm email verification




  registerUserFire(user) {
    return this.http.post<any>(`${environment.firebase.BASE_URL}signUp?key=
                                  ${environment.firebase.apiKey}`, user).pipe(
      delay(1000),
      map((response: HttpResponse<any>) => response),
      debounceTime(5000),
      catchError(err => of([]))
    );
  }
  signUp(payload: UserModel): Observable<any> {
    return this.http.post(`${BASE_URL}/signup`, payload).pipe(
      map((response: HttpResponse<any>) => response),
      delay(2000),
      debounceTime(5000),
      this.backoff(3, 250),
      catchError(err => of([])));
  }
  getTokenOrRefreshed(): Observable<any> {
    return this.http.get<any>(`${environment.firebase.BASE_URL}
        /token`).pipe(
      map((response: HttpResponse<any>) => response),
      tap(response => {
        this.dataStore.next(response);
      }),
      delay(4000),
      debounceTime(5000),
      this.backoff(3, 250),
      catchError(err => of([])));
  }
  getToken(): Observable<any> {
    return this.http.get<any>(`${BASE_URL}/token`).pipe(
      map((response: HttpResponse<any>) => response),
      tap(response => {
        this.dataStore.next(response);
      }),
      delay(4000),
      debounceTime(5000),
      this.backoff(3, 250),
      catchError(err => of([])));
  }
  logout(token) {
    const that = this;
    return this.http.post(`${BASE_URL}/logout`, { token }, httpOptions).pipe(
      map((response: HttpResponse<any>) => response),
      this.backoff(3, 250),
      delay(1000),
      tap(_ => {
        this.token = null;
        this.resetLocalStorageVals();
      }));
  }
  isLoggedIn(): boolean {
    const tokenStore = localStorage.getItem('token') || '';
    const usernameStore = localStorage.getItem('username') || '';
    return ((tokenStore !== 'undefined' && tokenStore.length > 0) &&
      (usernameStore !== 'undefined' && usernameStore.length > 0)) ?
      true
      :
      false;
  }
  initStorage() {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', '');
    } else if (!localStorage.getItem('gravatar')) {
      localStorage.setItem('gravatar', '');
    } else if (!localStorage.getItem('userState')) {
      localStorage.setItem('userState', '');
    } else if (!localStorage.getItem('userState')) {
      localStorage.setItem('userState', 'Login');
    }
  }
  resetLocalStorageVals() {
    localStorage.setItem('token', '');
    localStorage.setItem('gravatar', '');
    localStorage.setItem('username', '');
    localStorage.setItem('userState', 'Login');
  }
  // Initialize the Google API client with desired scopes
  initClient() {
    if(this.gapi){
     this.gapi.load('client', () => {
      console.log('loaded client');

      // It's OK to expose these credentials, they are client safe.
      this.gapi.client.init({
        apiKey: environment.firebase.apiKey,
        clientId: environment.gapi.clientId,
        discoveryDocs: environment.gapi.discoveryDocs,
        scope: environment.gapi.scope
      });

      this.gapi.client.load('calendar', 'v3', () => console.log('loaded calendar'));

    });
  }
  }
  /* googleSignin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
}*/
  googleSignin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider): any {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        return this.updateUserData(credential.user);
      });
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<FireUser> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      first_name: user.displayName,
      profile_path: user.photoURL,
      token: user.refreshToken
    };

    return userRef.set(data, { merge: true });

  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  /*async loginGoogleAuth() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();

    const token = googleUser.getAuthResponse().id_token;

    console.log(googleUser);

    const credential = firebase.auth.GoogleAuthProvider.credential(token);

    await  firebase.auth.Auth.signInWithCredential(credential);
  }*/
  async getCalendar() {
    const events = await this.gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    });
    console.log(events);
    this.calendarItems = events.result.items;
  }
  async insertEvent() {
    const insert = await this.gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'America/New_York'
      },

      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'America/New_York'
      },
      summary: 'Have Fun!!!',
      description: 'Do some cool stuff and have a fun time doing it'
    });
    await this.getCalendar();
  }

}
