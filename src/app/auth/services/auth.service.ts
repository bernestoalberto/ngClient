import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { Observable, of, throwError } from 'rxjs';
import { Authenticate } from '../models/authentication.model';
import { FireUser } from '../models/user.model';
const mockUser = { first_name: 'Ernesto', email: 'ebonetmoncada@eabonet.com' };

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  public user$: Observable<FireUser> = of({
     uid: '',
    email: ''
  });

  login(auth: Authenticate): Observable<UserModel> {
    if (auth && auth.username !== '') {
      return throwError('Invalid username or password');
    }

    this.loggedIn = true;
    return of(mockUser);
  }

  logout() {
    this.loggedIn = false;
    return of(true);
  }

  check() {
    return of(this.loggedIn ? mockUser : null);
  }
}
