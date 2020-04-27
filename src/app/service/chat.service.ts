import { Chat } from './../entity/chat';
import { UserService } from './user.service';
import { Message } from '../entity/message';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private collectionName = 'chat';

  constructor(
    private store: AngularFirestore,
    private userService: UserService
  ) {}

  sendMessage(message: Message) {
    if (message.chatId) {
      const docRef = this.store
        .collection(this.collectionName)
        .doc(message.chatId);
      if (message.fromId && message.toId) {
        docRef.set({ users: [message.fromId, message.toId] });
      }
      docRef.collection('chat').add(message);
    } else {
      const docRef = this.store
        .collection(this.collectionName)
        .doc(this.getChatId(message.fromId, message.toId));
      docRef.set({ users: [message.fromId, message.toId] });
      docRef.collection('chat').add(message);
    }
  }

  getMessagesFromChat(id: string, amount: number) {
    return this.store
      .collection(this.collectionName)
      .doc(id)
      .collection<Message>('chat', (ref) =>
        ref.orderBy('sentAt', 'desc').limit(amount)
      )
      .valueChanges();
  }

  getUserChats() {
    return new Observable<Chat[]>((observer) => {
      this.userService.userDataSubject.subscribe((user) => {
        if (user) {
          const uid = user.uid;
          this.store
            .collection<Chat>(this.collectionName, (ref) =>
              ref.where('users', 'array-contains', uid)
            )
            .snapshotChanges()
            .pipe(
              map((changes) => {
                return changes.map((c) => {
                  const data = c.payload.doc.data();
                  const id = c.payload.doc.id;
                  const chat: Chat = {
                    id: id,
                    ...data,
                  };
                  return chat;
                });
              })
            )
            .subscribe((chats) => observer.next(chats));
        }
      });
    });
  }
  getChat(id: string) {
    return this.store.collection(this.collectionName).doc(id).valueChanges();
  }

  getChatId(firstUID, secondUID) {
    let from = '';
    let to = '';
    if (firstUID < secondUID) {
      from = firstUID;
      to = secondUID;
    } else {
      from = secondUID;
      to = firstUID;
    }
    return from + '_' + to;
  }

  getChatIdWithUser(otherUID) {
    return this.getChatId(this.userService.userDataSubject.value.uid, otherUID);
  }
}
