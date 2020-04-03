import { UserService } from 'src/app/service/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/entity/message';
import { ChatService } from 'src/app/service/chat.service';

@Component({
  selector: 'app-fullchat',
  templateUrl: './fullchat.page.html',
  styleUrls: ['./fullchat.page.scss'],
})
export class FullchatPage implements OnInit {
  id: string;
  uid: string;
  messages: Message[]
  constructor(private route: ActivatedRoute, private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.uid = this.userService.userData.uid;
    this.id = this.route.snapshot.paramMap.get('id')
    this.chatService.getMessagesFromChat(this.id, 50).subscribe(messages => {
      console.log(messages);
      this.messages = messages.reverse();})
  }

}
