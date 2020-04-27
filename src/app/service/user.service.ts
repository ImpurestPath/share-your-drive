import { User } from './../entity/user';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import { auth } from 'firebase';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  user: firebase.User;
  userDataSubject: BehaviorSubject<any>;
  userData: Observable<any>;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth
  ) {
    this.userData = new Observable();
    this.userDataSubject = new BehaviorSubject(this.userData);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.updateLocalData();
      } else {
        this.user = null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  private updateLocalData() {
    if (firebase.auth().currentUser) {
      this.user = firebase.auth().currentUser;
      this.getOtherUserData(this.user.uid)
        .pipe(take(1))
        .subscribe((ud) => {
          console.log('Updated user');
          console.log(ud.data());
          this.userDataSubject.next(ud.data());
          localStorage.setItem('user', JSON.stringify(ud.data()));
          JSON.parse(localStorage.getItem('user'));
        });
    } else {
      this.user = null;
      this.userDataSubject.next(null);
    }
  }

  // updateUser(){
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.getOtherUserData(user.uid).subscribe(ud => {
  //         this.userData = ud.data();
  //         localStorage.setItem('user', JSON.stringify(this.userData));
  //         JSON.parse(localStorage.getItem('user'));
  //       })
  //       } else {
  //       localStorage.setItem('user', null);
  //       JSON.parse(localStorage.getItem('user'));
  //     }
  //   })
  // }
  // Login in with email/password
  signInEmail(email, password) {
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.auth.signInWithEmailAndPassword(email, password).then(
        (res) => {
          this.ngFireAuth.auth.setPersistence(
            firebase.auth.Auth.Persistence.LOCAL
          );
          resolve(res);
        },
        (err) => reject(err)
      );
    });
  }

  // Register user with email/password
  signUpEmail(name, email, password) {
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password).then(
        (res) => {
          this.signInEmail(email, password)
            .then(() => {
              firebase
                .auth()
                .currentUser.updateProfile({ displayName: name })
                .then(() => {
                  this.setUserData(firebase.auth().currentUser);
                  // this.updateLocalData();
                  this.signOut();
                  this.signInEmail(email, password);
                  resolve(res);
                })
                .catch((err) => {
                  console.error(err);
                  reject(err);
                });
            })
            .catch((err) => {
              console.error(err);
              reject(err);
            });
        },
        (err) => reject(err)
      );
    });
  }

  // Email verification when new user register
  sendVerificationEmail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification();
  }

  // Recover password
  passwordRecover(passwordResetEmail) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail);
  }

  // Returns true when user is looged in
  get isSignedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }

  // Sign in with Gmail
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  // TODO finish
  authLogin(provider) {
    return new Promise((resolve, reject) =>
      this.ngFireAuth.auth
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result);
          console.log(result.user);
          this.setUserData(result.user);
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        })
    );
  }

  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      favorites: user.favorites ? user.favorites : [],
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  addFavorite(userId: string, origin: string, destination: string) {
    return this.afStore
      .collection('users')
      .doc(userId)
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion({
          origin,
          destination,
        }),
      });
  }

  getUserData(userId: string) {
    return this.afStore.collection('users').doc(userId).valueChanges();
  }

  // Sign-out
  signOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      this.updateLocalData();
      localStorage.removeItem('user');
    });
  }

  getOtherUserData(userId: string) {
    return this.afStore.collection<User>('users').doc(userId).get();
  }
}
