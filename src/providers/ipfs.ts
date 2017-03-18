import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as IPFS from 'ipfs';
import fetch from 'node-fetch';
/*
 Generated class for the Ipfs provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class IpfsProvider {

    private node: any;
    private repoPath: string;

    constructor(public http: Http) {

        this.repoPath = String(Math.random());

        this.start({ emptyRepo: true, bits: 2048 }).then((node)=>{
            console.log("IPFS online");
        }).catch((err)=>{
            console.log(err);
        });

    }

    start(config = {}) {
        this.node = new Promise((resolve, reject) => {

            let node =  new IPFS(
                {
                    repo: this.repoPath,
                    init: false,
                    start: false,
                    EXPERIMENTAL: {
                        pubsub: true
                    }
                }
            );

            node.init(config, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                node.goOnline((err) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(node);
                });

            });
        });

        return this.node;

    }

    getNode() {
        return this.node;
    }

    isReady(){
        return this.node.isOnline();
    }


    addFile(file) {

      return new Promise((resolve, reject) => {
        this.node.files.add(file, (err, res) => {
          if (err) {
            reject(err);
          }

          const hash = res[0].hash;

          this.node.files.cat(hash, (err, res) => {
            if (err) {
              reject(err);
            }

            let data = '';
            res.on('data', (d) => {
              data = data + d
            });

            res.on('end', () => {
              resolve(data);
            })
          })
        })
      });

    }

    addFromUrl(url = '') {
        return fetch(url)
          .then(function(res) {
            return this.addFile(res.buffer());
          }).then(function(body) {
            console.log(body);
        });
    }

}
