import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase';

describe('UserService', () => {
  firebase.initializeApp(environment.firebaseConfig);

  const fakeAFS = jasmine.createSpyObj('AngularFirestore', ['collection']);
  fakeAFS.collection.and.returnValue(
    jasmine.createSpyObj('collection', [
      'add',
      'doc',
      'snapshotChanges',
      'valueChanges',
    ])
  );
  fakeAFS
    .collection()
    .snapshotChanges.and.returnValue(
      jasmine.createSpyObj('snapshotChanges', ['pipe'])
    );
  fakeAFS
    .collection()
    .doc.and.returnValue(
      jasmine.createSpyObj('doc', ['update', 'delete', 'valueChanges'])
    );
  fakeAFS
    .collection()
    .doc()
    .update.and.returnValue(
      new Promise((resolve, reject) => {
        resolve(true);
      })
    );
  fakeAFS
    .collection()
    .doc()
    .valueChanges.and.returnValue(
      jasmine.createSpyObj('valueChanges', ['pipe'])
    );

  // const firebase = jasmine.createSpyObj('firebase', [
  //   'User',
  //   'auth',
  //   'firestore',
  // ]);
  // firebase.auth.and.returnValue(
  //   jasmine.createSpyObj('auth', [
  //     'signInWithEmailAndPassword',
  //     'createUserWithEmailAndPassword',
  //     'sendPasswordResetEmail',
  //     'signInWithPopup',
  //     'signOut',
  //     'currentUser',
  //     'onAuthStateChanged',
  //     'currentUser',
  //     'setPersistence',
  //   ])
  // );
  // firebase
  //   .auth()
  //   .currentUser.and.returnValue(
  //     jasmine.createSpyObj('currentUser', [
  //       'sendEmailVerification',
  //       'updateProfile',
  //     ])
  //   );

  // fakeAuth.authState().subscribe.and.returnValue(jasmine.createSpyObj('subscribe', [' mock']))

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: fakeAFS },
        // { provide: firebase, useValue: firebase },
      ],
    });
  });
  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should call signInWithEmailAndPassword', async () => {
      const service: UserService = TestBed.get(UserService);
      spyOn(firebase.auth(), 'signInWithEmailAndPassword').and.returnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      );
      service.signInEmail('', '');
      expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should call signOut', async () => {
      const service: UserService = TestBed.get(UserService);
      spyOn(firebase.auth(), 'signOut').and.returnValue(
        new Promise((resolve, reject) => {
          resolve();
        })
      );
      service.signOut();
      expect(firebase.auth().signOut).toHaveBeenCalled();
    });
  });
});
