import { TestBed } from '@angular/core/testing';

import { DriveService } from './drive.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Drive } from '../entity/drive';

describe('DriveService', () => {
  const fakeAFS = jasmine.createSpyObj('AngularFirestore', ['collection']);
  fakeAFS.collection.and.returnValue(jasmine.createSpyObj('collection', ['add', 'doc', 'snapshotChanges', 'valueChanges']));
  fakeAFS.collection().snapshotChanges.and.returnValue(jasmine.createSpyObj('snapshotChanges', ['pipe']))
  // spyOn(fakeAFS.collection(), 'snapshotChanges')
  fakeAFS.collection().doc.and.returnValue(jasmine.createSpyObj('doc', ['update','delete','valueChanges']));
  const driveMock: Drive = {
    id: '1',
    startPlace: '2',
    finishPlace: '3',
    startDate: new Date(),
    finishDate: new Date(),
    driverId: '4',
    createdAt: new Date()
  }
  // fakeAFS.collection().doc().valueChanges.and.returnValue(of('FakeDocument'));


  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: AngularFirestore, useValue: fakeAFS },],
  }));

  it('should be created', () => {
    const service: DriveService = TestBed.get(DriveService);
    expect(service).toBeTruthy();
  });

  describe('getAll', () => {
    it('should call firebase collection() function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.getAll();
      expect(fakeAFS.collection).toHaveBeenCalled()
    })
  })

  describe('create', () => {
    it('should call firebase create function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.create(driveMock);
      expect(fakeAFS.collection().add).toHaveBeenCalled()
    })
  })

  describe('update', () => {
    it('should call firebase update function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.update(driveMock);
      expect(fakeAFS.collection().doc().update).toHaveBeenCalled()
    })
  })

  describe('delete', () => {
    it('should call firebase delete function', () => {
      const service: DriveService = TestBed.get(DriveService);
      service.delete(driveMock);
      expect(fakeAFS.collection().doc().delete).toHaveBeenCalled()
    })
  })
});
