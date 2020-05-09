<p align="center">

<a href="https://slackin-pbfjhfxnsa.now.sh"><img src="https://slackin-pbfjhfxnsa.now.sh/badge.svg"></a>

<a href="https://circleci.com/gh/codediodeio/angular-ng-client"><img src="https://circleci.com/gh/codediodeio/angular-ng-client.svg?style=svg"></a>

</p>

# The First Moncadas's Office

The First Moncadas's Office is an Angular PWA powered by Firebase.


## Features

- Angular 9.x + Firebase
- Installable PWA
- OAuth and Email/Password Signup with Firebase
- Drag & drop Kanban demo with Firestore
- Angular Universal SSR with Nest.js deployed to Google Cloud Run
- Optional SSR Prerendering Script

## Usage

1.  Run

- `git clone https://github.com/codediodeio/angular-ng-client.git ng-client`
- `cd ng-client`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

![](https://firebasestorage.googleapis.com/v0/b/ng-client-96e46.appspot.com/o/project-config.PNG?alt=media&token=5eabb205-7ba2-4fc3-905f-e9547055e754)

3.  Add the config to your Angular environment

#### src/environments/

Update the `environment.prod.ts` and `environment.ts` files. 

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    projectId: 'DEV-APP',
    storageBucket: 'DEV-APP.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  }
};
```


5.  Run `ng serve`
