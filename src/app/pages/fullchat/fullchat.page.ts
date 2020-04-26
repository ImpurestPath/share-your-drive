import { UserService } from 'src/app/service/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/entity/message';
import { ChatService } from 'src/app/service/chat.service';
import * as moment from 'moment';
import { Chat } from 'src/app/entity/chat';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fullchat',
  templateUrl: './fullchat.page.html',
  styleUrls: ['./fullchat.page.scss'],
})
export class FullchatPage implements OnInit, OnDestroy {
  chatId: string;
  toId: string;
  uid: string;
  messages: Message[];
  otherUser: any;
  currentMessage: string;
  public moment: any = moment;
  subscribtion: Subscription;
  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
    private userService: UserService,
    private location: Location
  ) {}

  async ngOnInit() {
    this.uid = this.userService.userDataSubject.value.uid;
    this.chatId = this.route.snapshot.paramMap.get('chatId');
    this.toId = this.route.snapshot.paramMap.get('toId');
    this.subscribtion = this.chatService
      .getChat(this.chatId)
      .subscribe((chat: Chat) => {
        if (this.toId === 'null') {
          this.toId =
            this.uid === chat.users[0] ? chat.users[1] : chat.users[0];
        }
        this.userService.getOtherUserData(this.toId).subscribe((user) => {
          console.log(this.toId);
          this.otherUser = user.data();
          console.log(this.otherUser);
        });
      });
    this.chatService
      .getMessagesFromChat(this.chatId, 50)
      .subscribe((messages) => {
        console.log(messages);
        this.messages = messages.reverse();
      });
  }

  sendMessage() {
    console.log('Sending...');
    const message: Message = {
      fromId: this.uid,
      messageText: this.currentMessage,
      sentAt: new Date(),
      toId: this.toId,
      chatId: this.chatId,
    };
    this.chatService.sendMessage(message);
    this.currentMessage = '';
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.subscribtion.unsubscribe();
  }
}
