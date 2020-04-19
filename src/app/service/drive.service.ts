import { Drive } from './../entity/drive';

import { map, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

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
      ref
        .valueChanges()
        .pipe(take(1))
        .subscribe((data: Drive) => {
          if (!data.passengers.includes(userId) && data.seatsLeft > 0) {
            data.passengers.push(userId);
            data.seatsLeft -= 1;
            ref
              .update(data)
              .then(() => {
                resolve('Successfully booked');
              })
              .catch(() => {
                reject('Cannot connect to server');
              });
          } else {
            reject('No place or drive already booked');
          }
        });
    });
  }

  unbookDrive(userId: string, driveId: string) {
    return new Promise((resolve, reject) => {
      const ref = this.store.collection(this.collectionName).doc(driveId);
      ref
        .valueChanges()
        .pipe(take(1))
        .subscribe((data: Drive) => {
          if (data.passengers.includes(userId)) {
            const index = data.passengers.indexOf(userId);
            data.passengers.splice(index, 1);
            data.seatsLeft += 1;
            ref
              .update(data)
              .then(() => {
                resolve('Successfully unbooked');
              })
              .catch(() => {
                reject('Cannot update in firebase');
              });
          } else {
            reject('Drive is not booked');
          }
        });
    });
  }
}
