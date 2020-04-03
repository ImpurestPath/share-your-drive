import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/service/chat.service';
import { UserService } from 'src/app/service/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chats = []
  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {
    this.chatService.getUserChats().subscribe(async basicChats => {
      this.chats = [];
      for (let basicChat of basicChats){
        const user = basicChat.users[0] == this.userService.userData.uid ? basicChat.users[1] : basicChat.users[0];

        const name = (await this.userService.getOtherUserData(user).toPromise()).data().displayName;
        const lastMessage = (await this.chatService.getMessagesFromChat(basicChat.id,1).pipe(take(1)).toPromise())[0]

        this.chats.push({
          name: name,
          lastMessage: lastMessage,
        })
      }
    })
  }

}
