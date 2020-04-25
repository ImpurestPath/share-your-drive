import { TestBed } from '@angular/core/testing';

import { ChatService } from './chat.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Message } from '../entity/message';
import { UserService } from './user.service';
import { Observable, BehaviorSubject } from 'rxjs';

describe('ChatService', () => {
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
    .snapshotChanges()
    .pipe.and.returnValue(jasmine.createSpyObj('pipe', ['subscribe']));
  fakeAFS
    .collection()
    .doc.and.returnValue(
      jasmine.createSpyObj('doc', [
        'update',
        'delete',
        'valueChanges',
        'set',
        'collection',
      ])
    );
  fakeAFS
    .collection()
    .doc()
    .collection.and.returnValue(
      jasmine.createSpyObj('collection', ['add', 'valueChanges'])
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

  let message: Message = {
    fromId: '1',
    toId: '2',
    chatId: '3',
    messageText: 'message',
    sentAt: new Date(),
  };
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [{ provide: AngularFirestore, useValue: fakeAFS }],
    })
  );

  it('should be created', () => {
    const service: ChatService = TestBed.get(ChatService);
    expect(service).toBeTruthy();
  });

  describe('sendMessage', () => {
    it('should call add method', () => {
      const service: ChatService = TestBed.get(ChatService);
      service.sendMessage(message);
      expect(fakeAFS.collection().doc().collection().add).toHaveBeenCalled();
    });
  });

  describe('getMessagesFromChat', () => {
    it('should call valueChanges', () => {
      const service: ChatService = TestBed.get(ChatService);
      service.getMessagesFromChat('1', 5);
      expect(
        fakeAFS.collection().doc().collection().valueChanges
      ).toHaveBeenCalled();
    });
  });

  describe('getUserChats', () => {
    it('should call snapshotChanges when user is presented', () => {
      const service: ChatService = TestBed.get(ChatService);
      const userService: UserService = TestBed.get(UserService);
      userService.userDataSubject = new BehaviorSubject({ uid: '124' });
      service
        .getUserChats()
        .subscribe((res) => {})
        .unsubscribe();
      expect(fakeAFS.collection().snapshotChanges).toHaveBeenCalled();
    });
  });

  describe('getChat', () => {
    it('should call valueChanges', () => {
      const service: ChatService = TestBed.get(ChatService);
      service.getChat('sada');
      expect(fakeAFS.collection().doc().valueChanges).toHaveBeenCalled();
    });
  });
});
