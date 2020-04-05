// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase:  {
    apiKey: 'AIzaSyDoqRhvIvb4t6Tl6z9svVnOMG1hWKsD3TU',
    authDomain: 'adminmoftbot.firebaseapp.com',
    tokenUrl: 'https://securetoken.googleapis.com/v1/token?key=',
    BASE_URL: 'https://identitytoolkit.googleapis.com/v1/accounts:',
    databaseURL: 'https://adminmoftbot.firebaseio.com',
    projectId: 'adminmoftbot',
    storageBucket: 'adminmoftbot.appspot.com',
    messagingSenderId: '867081262900',
    gcm_sender_id: '103953800507',
    web_push_certf: 'BLy27zooLeTKSZpvzwVOh2GV_riqZlWfX54JvuDC0yCLEHIR-S4aWOz4tTvahqiNfk1djMHy_SQcC3ynYwbxB9E',
    appId: '1:867081262900:web:519f5d712e703bb95eb761',
    measurementId: 'G-FV1NWX6479'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
