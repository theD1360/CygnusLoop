import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {LoginPage} from "../login/login";

/*
 Generated class for the Signup page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    private errors: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SignupPage');
    }

    signup(phone, email, password, password2) {
        if (password != password2) {
            this.errors = "Passwords do not match!";
        }

        //TODO: do some signup stuff here
    }

    navigateToLogin(){
        this.navCtrl.setRoot(LoginPage);
    }

}
