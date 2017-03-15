import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Page1 } from '../../pages/page1/page1';

import { Auth } from '../../providers/auth';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: Auth) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(email, password) {
    this.auth.login(email, password).then((token)=>{
      if (token !== null) {
        this.navCtrl.setRoot(Page1);
      }
    });
  }

}
