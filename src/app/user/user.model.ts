export interface UserModel {
  first_name: string;
  email: string;
  last_name?: string;
   password?: string;
  token?: string;
  profile_path?: string;
  [key: string]: any;
}

export interface UserNotification {
  title: string;
  body: string;
  image?: string;
  action?: string;
  [key: string]: any;
}
export interface IUser {
  uid: string;
  displayName: string;
  loading?: boolean;
  error?: string;
}

export class UserFire implements IUser {
  constructor(public uid: string, public displayName: string) {}
}
export interface FireUser {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  myCustomData?: string;
}
export class User {
  username:  string;
  password: string;
  token?: string;
  firstName: string;
  email: string;
  lastName?: string;
  profilePath?: string;
  [key: string]: any;
}
export interface Credentials {
  username:  string;
  password: string;
  token?: string;
}
