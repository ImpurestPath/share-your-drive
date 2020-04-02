import { Drive } from './../entity/drive';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DriveService {
  private collectionName = 'drive';
  drives: AngularFirestoreCollection;

  constructor(private store: AngularFirestore) { }

  private getDataWithMeta(collection: AngularFirestoreCollection){
    return collection.snapshotChanges().pipe(map(changes => {
      return changes.map(c => {
        const data = c.payload.doc.data();
        const id = c.payload.doc.id;
        return { id, ...data };
      })
    }))
  }

  getAll() {
    this.drives = this.drives == undefined ? this.store.collection<Drive>(this.collectionName) : this.drives
    return this.getDataWithMeta(this.drives)
  }

  getRecent(number: number) {
    return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref => 
          ref.orderBy('createdAt', 'desc').limit(number)))
  }

  create(drive: Drive){
    //TODO: add fields 
    this.store.collection(this.collectionName).add(drive);
  }

  update(drive: Drive){
    this.store.collection(this.collectionName).doc(drive.id).update(drive);
  }

  delete(drive: Drive){
    this.store.collection(this.collectionName).doc(drive.id).delete();
  }
  
}
