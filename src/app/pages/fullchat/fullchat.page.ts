import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/entity/message';
import { ChatService } from 'src/app/service/chat.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-fullchat',
  templateUrl: './fullchat.page.html',
  styleUrls: ['./fullchat.page.scss'],
})
export class FullchatPage implements OnInit {
  id: string;
  uid: string;
  messages: Message[];
  currentMessage: string;
  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService) { }

  async ngOnInit() {
    this.uid = this.userService.userDataSubject.value.uid;
    this.id = this.route.snapshot.paramMap.get('id')
    this.chatService.getMessagesFromChat(this.id, 50).subscribe(messages => {
      console.log(messages);
      this.messages = messages.reverse();})
  }

  sendMessage(){
    console.log('Sending...')
    const message: Message = {
      fromId: this.uid,
      messageText: this.currentMessage,
      sentAt: new Date(),
      toId: null,
      chatId: this.id
    }
    this.chatService.sendMessage(message)
    this.currentMessage = '';
  }
}
