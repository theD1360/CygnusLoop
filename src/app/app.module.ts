import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';

import { Page1 } from '../pages/page1/page1';
import { SettingsPage } from '../pages/settings/settings';

import { Auth } from '../providers/auth';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
      MyApp,
      LoginPage,
      Page1,
      SettingsPage
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
      SettingsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Auth]
})
export class AppModule {}
