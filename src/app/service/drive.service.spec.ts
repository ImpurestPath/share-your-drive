import { TestBed } from '@angular/core/testing';

import { DriveService } from './drive.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Drive } from '../entity/drive';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

fdescribe('DriveService', () => {
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
  // spyOn(fakeAFS.collection(), 'snapshotChanges')
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

  let driveMock = {
    id: '1',
    origin: 'Origin town',
    destination: 'Destination town',
    startDate: new Date(),
    finishDate: new Date(),
    driverId: '4',
    createdAt: new Date(),
    info: 'drive mock',
    passengers: ['id1', 'id2'],
    seatsMax: 4,
    seatsLeft: 1,
  };

  // fakeAFS.collection().doc().valueChanges.and.returnValue(of('FakeDocument'));

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: fakeAFS }],
    })
  );

  it('should be created', () => {
    const service: DriveService = TestBed.get(DriveService);
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should call firebase collection() function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.getAll();
      expect(fakeAFS.collection).toHaveBeenCalled();
    });

    it('should return drives', () => {
      const service: DriveService = TestBed.get(DriveService);
      const drives = [
        { id: '1', ...driveMock },
        { id: '2', ...driveMock },
      ];
      fakeAFS
        .collection()
        .snapshotChanges()
        .pipe.and.returnValue(
          new Observable((observer) => {
            observer.next(drives);
          })
        );
      service
        .getAll()
        .pipe(take(1))
        .subscribe((d) => {
          expect(d).toEqual(drives);
        });
    });
  });

  describe('create drive', () => {
    it('should call firebase create function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.create(driveMock);
      expect(fakeAFS.collection().add).toHaveBeenCalled();
    });
  });

  describe('update', () => {
    it('should call firebase update function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.update(driveMock, '1');
      expect(fakeAFS.collection().doc().update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('should call firebase delete function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.delete(driveMock);
      expect(fakeAFS.collection().doc().delete).toHaveBeenCalled();
    });
  });

  describe('book drive', () => {
    it('should book drive when seats available', () => {
      const service: DriveService = TestBed.get(DriveService);
      const drive = { id: '1', ...driveMock };
      fakeAFS
        .collection()
        .doc()
        .valueChanges()
        .pipe.and.returnValue(
          new Observable((observer) => {
            observer.next(drive);
          })
        );
      expectAsync(service.bookDrive('1', '1')).toBeResolved();
    });
    it('should not book drive when no seats available', () => {
      const service: DriveService = TestBed.get(DriveService);
      const drive = { id: '1', seatsLeft: 0, ...driveMock };
      fakeAFS
        .collection()
        .doc()
        .valueChanges()
        .pipe.and.returnValue(
          new Observable((observer) => {
            observer.next(drive);
          })
        );
      expectAsync(service.bookDrive('1', '1')).toBeRejected();
    });

    it('should not book drive when drive already booked', () => {
      const service: DriveService = TestBed.get(DriveService);
      const drive = { id: '1', passengers: ['1'], ...driveMock };
      fakeAFS
        .collection()
        .doc()
        .valueChanges()
        .pipe.and.returnValue(
          new Observable((observer) => {
            observer.next(drive);
          })
        );
      expectAsync(service.bookDrive('1', '1')).toBeRejected();
    });
  });
  describe('unbook drive', () => {
    it('should unbook drive when drive is booked', () => {
      const service: DriveService = TestBed.get(DriveService);
      const drive = { id: '1', ...driveMock };
      fakeAFS
        .collection()
        .doc()
        .valueChanges()
        .pipe.and.returnValue(
          new Observable((observer) => {
            observer.next(drive);
          })
        );
      expectAsync(service.unbookDrive('id1', '1')).toBeResolved();
    });
    it('should not unbook drive when drive is not booked', () => {
      const service: DriveService = TestBed.get(DriveService);
      const drive = { id: '1', ...driveMock };
      fakeAFS
        .collection()
        .doc()
        .valueChanges()
        .pipe.and.returnValue(
          new Observable((observer) => {
            observer.next(drive);
          })
        );
      expectAsync(service.bookDrive('3', '1')).toBeRejected();
    });
  });
});
