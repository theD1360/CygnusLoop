import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { Page1 } from '../pages/page1/page1';
import { SettingsPage } from '../pages/settings/settings';
import { StatusPage } from '../pages/status/status';

import { SignupPage } from '../pages/signup/signup';


import { Auth } from '../providers/auth';
import { IpfsProvider } from '../providers/ipfs';

import { IonicStorageModule } from '@ionic/storage';
import {AlbumsPage} from "../pages/albums/albums";

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
      Page1,
      SettingsPage,
      SignupPage,
      StatusPage,
      AlbumsPage
  ],
  imports: [
      IonicModule.forRoot(MyApp),
      IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
      MyApp,
      LoginPage,
      Page1,
      SettingsPage,
      SignupPage,
      StatusPage,
      AlbumsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Auth, IpfsProvider]
})
export class AppModule {}
