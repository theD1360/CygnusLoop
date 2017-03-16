import {Component, ViewChild} from '@angular/core';
import {Nav, Platform, LoadingController} from 'ionic-angular';
//import { Splashscreen } from 'ionic-native';

import {Page1} from '../pages/page1/page1';
import {SettingsPage} from '../pages/settings/settings';
import {LoginPage} from '../pages/login/login';
import {Storage} from '@ionic/storage';
import {Auth} from '../providers/auth';
import {IpfsProvider} from "../providers/ipfs";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any;
    loader: any;
    status: string = "offline";
    pages: Array<{title: string, component: any}>;

    constructor(public platform: Platform, public storage: Storage, public auth: Auth, public loadingCtl: LoadingController, public ipfs: IpfsProvider) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [];
        // used for an example of ngFor and navigation
        this.pages.push({title: 'Dash', component: Page1});
        this.pages.push({title: 'Settings', component: SettingsPage});
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // StatusBar.styleDefault();
            // Splashscreen.hide();

            this.ipfs.getNode().then((node)=>{
                node.id((err, id)=>{console.log(id)})
                this.status = node.isOnline() ? "online": "offline";
            });



            this.showLoader();

            this.storage.ready().then(() => {

                this.auth.loginWithToken().then((isLoggedIn) => {
                    if (isLoggedIn) {
                        this.rootPage = Page1;


                    } else {
                        this.rootPage = LoginPage;
                    }
                    this.hideLoader();
                });

            });

        });

    }

    openPage(page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    }

    showLoader() {
        this.loader = this.loadingCtl.create({
            content: "please wait"
        });
        this.loader.present();
    }

    hideLoader() {
        this.loader.dismiss();
    }

    logout() {
        this.auth.logout().then(() => {
            this.nav.setRoot(LoginPage);
        });
    }

}
