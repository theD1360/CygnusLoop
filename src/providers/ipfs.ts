import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import * as IPFS from 'ipfs';
import { Buffer } from 'buffer';

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
                    }
                }
            );

            node.init(config, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                node.load(function(e){
                  if (err) {
                    reject(err)
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
        console.log(node.prototype);

        node.then((node)=>{
          console.log("Node REady", Buffer.isBuffer(file));
          console.log(Object.getOwnPropertyNames(node.files));
          node.files.add(file, function(e, res){
            console.log("Adding File");

            if(e || !res) {
              console.error(e);
              reject(e);
            }



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
          })

        });

      });

    }


}
