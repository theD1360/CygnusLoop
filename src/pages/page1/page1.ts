import {Component} from '@angular/core';

import {NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'page-page1',
    templateUrl: 'page1.html'
})
export class Page1 {

  files: Array<{path:string, hash: string, size: number}>;

  constructor(public navCtrl: NavController, public storage: Storage) {
    storage.get('storageCache').then((d)=>{
      this.files = d;
    });
  }

}
