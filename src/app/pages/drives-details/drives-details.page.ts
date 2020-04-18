import { ChatService } from 'src/app/service/chat.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';
import { DriveService } from 'src/app/service/drive.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-drives-details',
  templateUrl: './drives-details.page.html',
  styleUrls: ['./drives-details.page.scss'],
})
export class DrivesDetailsPage implements OnInit {
  public formattedTime: any;
  public drive: any;

  @Input() set data(value: any) {
    this.drive = value;
    this.formattedTime = moment(this.drive.startDate).format(
      'MMMM Do YYYY, HH:mm'
    );
  }

  constructor(
    public modalController: ModalController,
    private router: Router,
    private chatService: ChatService,
    private driveService: DriveService,
    private userService: UserService
  ) {}

  ngOnInit() {
    console.log(this.drive);
  }

  bookSeat() {
    // BOOK A SEAT
    this.driveService
      .bookDrive(this.userService.userDataSubject.value.uid, this.drive.id)
      .then((d) => console.log(d))
      .catch((d) => console.log(d));
    console.log('Booking clicked');
  }

  messageDriver() {
    // SENDING A MESSAGE
    console.log('Send message clicked');
    this.modalController.dismiss();
    this.router.navigate([
      'tabs/tabs/chat',
      this.chatService.getChatIdWithUser(this.drive.driverId),
      this.drive.driverId,
    ]);
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
