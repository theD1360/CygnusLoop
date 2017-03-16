import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';


/*
  Generated class for the Auth provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Auth {

  constructor(public http: Http, public storage: Storage) {
    console.log('Hello Auth Provider');
  }

  /**
   * Login a user with a stored user token
   * @returns {Promise<T>|Promise}
   */
  loginWithToken() {

    return new Promise((resolve) => {
        this.storage.get('userToken').then((token)=>{
          setTimeout(() => {
            resolve( (token) ? true : false )
          }, 3000);

        });

    });

  }

  /**
   * login a user via password
   * @param email
   * @param password
   * @returns {Promise<T>|Promise}
   */
  login(email, password) {

    return new Promise((resolve) => {
      setTimeout(() => {
        if (email && password) {
            var token = "SomeRandomTokenFromServer";
          this.storage.set('userToken', token);
          resolve(token);

        } else {

          this.storage.set('userToken', null);
          resolve(null);

        }
      }, 3000);

    });
  }

  logout() {
    return new Promise((resolve) => {
      // setTimeout(() => {

        this.storage.set('userToken', null);
        resolve(null);

      // }, 3000);
    });
  }

}
