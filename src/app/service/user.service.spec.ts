import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AngularFirestore } from '@angular/fire/firestore';

describe('UserService', () => {
  const fakeAFS = jasmine.createSpyObj('AngularFirestore', ['collection']);
  fakeAFS.collection.and.returnValue(jasmine.createSpyObj('collection', ['add', 'doc', 'snapshotChanges', 'valueChanges']));
  fakeAFS.collection().snapshotChanges.and.returnValue(jasmine.createSpyObj('snapshotChanges', ['pipe']))
  fakeAFS.collection().doc.and.returnValue(jasmine.createSpyObj('doc', ['update', 'delete', 'valueChanges']));
  
  const fakeAuth = jasmine.createSpyObj('AngularFireAuth', ['authState', 'auth'])
  fakeAuth.authState.and.returnValue(new Observable( observer => {
    observer.next(null)
  }))
  fakeAuth.auth.and.returnValue(jasmine.createSpyObj('auth', ['signInWithEmailAndPassword', 'createUserWithEmailAndPassword', 'sendPasswordResetEmail', 'signInWithPopup', 'signOut', 'currentUser']))
  fakeAuth.auth().currentUser.and.returnValue(jasmine.createSpyObj('currentUser', ['sendEmailVerification']))
  // fakeAuth.authState().subscribe.and.returnValue(jasmine.createSpyObj('subscribe', [' mock']))
  
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: fakeAFS },
      { provide: AngularFireAuth, useValue: fakeAuth },
    ],
  }));
  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
