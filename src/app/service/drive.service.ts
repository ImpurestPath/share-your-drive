import { Drive } from './../entity/drive';

import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
=======
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
>>>>>>> feature/drives-filters

@Injectable({
  providedIn: 'root',
})
export class DriveService {
  private collectionName = 'drive';
  drives: AngularFirestoreCollection;

  constructor(private store: AngularFirestore) {}

  private getDataWithMeta(collection: AngularFirestoreCollection) {
    return collection.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => {
          const data = c.payload.doc.data();
          const id = c.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getAll() {
    this.drives =
      this.drives == undefined
        ? this.store.collection<Drive>(this.collectionName)
        : this.drives;
    return this.getDataWithMeta(this.drives);
  }

  getRecent(number: number) {
    return this.getDataWithMeta(
      this.store.collection<Drive>(this.collectionName, (ref) =>
        ref.orderBy('createdAt', 'desc').limit(number)
      )
    );
  }

<<<<<<< HEAD
  getNearest() {}

  getFavorites() {}

  getSearchResults(origin: string, destination: string, date?) {
    return this.getDataWithMeta(
      this.store.collection<Drive>(this.collectionName, (ref) =>
        ref
          .where('origin', '==', origin)
          .where('destination', '==', destination)
      )
    );
=======
  getNearest(location: string) {
    return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref =>
      ref.where('origin', '==', location).orderBy('startDate', 'asc')))
  }

  getSearchResults(origin: string, destination: string, date?: string) {
    if (date) {
      let start = new Date(`${date.split('T')[0]}T00:00:00`);
      let end = new Date(start.getTime() + 86400000);

      return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref =>
        ref.where('origin', '==', origin)
          .where('destination', '==', destination)
          .orderBy('startDate').startAt(start).endAt(end)
      ))
    }

    return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref =>
      ref.where('origin', '==', origin)
        .where('destination', '==', destination)
        .orderBy('startDate')
    ))
  }

  getFavorites(favorite) {
    console.log(favorite);
    return this.getDataWithMeta(this.store.collection<Drive>(this.collectionName, ref =>
      ref.where('origin', '==', favorite.origin)
        .where('destination', '==', favorite.destination)
        .orderBy('startDate')
    ))
>>>>>>> feature/drives-filters
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

  bookDrive(userId: string, driveId: string) {
    return new Promise((resolve, reject) => {
      const ref = this.store.collection(this.collectionName).doc(driveId);
      ref.valueChanges().pipe(take(1)).subscribe((data: Drive) => {
        if (!data.passengers.includes(userId) && data.seatsLeft > 0) {
          data.passengers.push(userId);
          data.seatsLeft -= 1;
          ref
            .update(data)
            .then(() => {
              resolve('Successfully booked');
            })
            .catch(() => {
              reject('Cannot update in firebase');
            });
        } else {
          reject('No place or drive already booked');
        }
      });
    });
  }
}
