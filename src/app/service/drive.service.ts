import { Drive } from './../entity/drive';

import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DriveService {
  private collectionName = 'drive';
  drives: AngularFirestoreCollection;

  constructor(private store: AngularFirestore) { }

  private getDataWithMeta(collection: AngularFirestoreCollection) {
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

  getNearest() {

  }

  getFavorites() {

  }

  getSearchResults(origin: string, destination: string, date?: string) {

    if (date) {
      console.log(date);
      let startDate = date.split('T')[0];
      console.log(startDate);
      let newDate = new Date(startDate);
      newDate.setDate(newDate.getDate() + 1);
      let endDate = moment(newDate).format('YYYY-MM-DD');

      return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref =>
        ref.where('origin', '==', origin)
          .where('destination', '==', destination)
          .orderBy('startDate').startAt(startDate).endAt(endDate)
      ))
    }

    return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref =>
      ref.where('origin', '==', origin)
        .where('destination', '==', destination)
    ))

  }

  create(drive: Drive) {
    //TODO: add fields 
    this.store.collection(this.collectionName).add(drive);
  }

  update(drive: Drive, driveId) {
    this.store.collection(this.collectionName).doc(driveId).update(drive);
  }

  delete(driveId) {
    this.store.collection(this.collectionName).doc(driveId).delete();
  }

}

