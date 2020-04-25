import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import * as firebase from 'firebase';

describe('AuthGuard', () => {
  // beforeEach(() => {
  //   TestBed.configureTestingModule({
  //     imports: [RouterTestingModule],
  //     providers: [AuthGuard],
  //   });
  // });

  // it('should return regarding to firebase', inject(
  //   [AuthGuard],
  //   (guard: AuthGuard) => {
  //     if (firebase.auth().currentUser) {
  //       expect(guard).toBeTruthy();
  //     } else {
  //       expect(guard).toBeFalsy();
  //     }
  //   }
  // ));
});
