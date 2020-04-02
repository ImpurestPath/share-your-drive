import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { User } from '../entity/user';
import { auth } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Observable<firebase.User>;
  userData: any;

  constructor(
    public afStore: AngularFirestore,
    public ngFireAuth: AngularFireAuth
  ) {
    this.user = this.ngFireAuth.user;
    this.ngFireAuth.authState.subscribe(user => {
      if (user) {
        console.log('Saved');
        
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  }

  // Login in with email/password
  signInEmail(email,password){
    return new Promise<any>((resolve, reject) => {
      this.ngFireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(
        res => {
          resolve(res),
          this.setUserData(res.user)
          this.ngFireAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        },
        err => reject(err))
    })
   }

  // Register user with email/password
  signUpEmail(email, password) {
    return this.ngFireAuth.auth.createUserWithEmailAndPassword(email, password)
  }

  // Email verification when new user register
  sendVerificationEmail() {
    return this.ngFireAuth.auth.currentUser.sendEmailVerification()
  }

  // Recover password
  passwordRecover(passwordResetEmail) {
    return this.ngFireAuth.auth.sendPasswordResetEmail(passwordResetEmail)
  }

  // Returns true when user is looged in
  get isSignedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Returns true when user's email is verified
  get isEmailVerified(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user.emailVerified !== false) ? true : false;
  }

  // Sign in with Gmail
  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  // TODO finish
  authLogin(provider) {
    return new Promise( (resolve, reject) => this.ngFireAuth.auth.signInWithPopup(provider)
      .then((result) => {
        
        this.setUserData(result.user);
        resolve(result);
      }).catch((error) => {
        reject(error);
      }))
  }

  // Store user in localStorage
  setUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  

  // Sign-out 
  signOut() {
    return this.ngFireAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
    })
  }
}