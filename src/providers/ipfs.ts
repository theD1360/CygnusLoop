import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as IPFS from 'ipfs';
// import { Buffer } from 'buffer';

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
                    EXPERIMENTAL: {
                        pubsub: false
                    },
                  config: { // overload the default config
                    Addresses: {
                      Swarm: [
                        '/ip4/127.0.0.1/tcp/1337',
                        '/ip4/127.0.0.1/tcp/1337/ws'
                      ]
                    }
                  }
                }
            );

            node.on('start', ()=>{
              resolve(node);
            });

            node.on('error', (err)=>{
              console.log("Init Errors: ", err);
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
      let node = this.node;


      return new Promise((resolve, reject) => {
        node.then((node)=>{
          console.log("Node REady", file);

          node.files.add(file, (err, res) => {
            console.log("Adding File", err, res);
            resolve(res);
            //
            // if(e || !res) {
            //   console.error(e);
            //   reject(e);
            // }

            // const hash = res[0].hash;
            //
            // node.files.cat(hash, (err, res) => {
            //   if (err) {
            //     reject(err);
            //   }
            //
            //   let data = '';
            //   res.on('data', (d) => {
            //     data = data + d
            //   });
            //
            //   res.on('end', () => {
            //     resolve(data);
            //   })
            // })
          });

        });

      });

    }


}
