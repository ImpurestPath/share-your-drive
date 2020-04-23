import { ChatService } from 'src/app/service/chat.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DriveService } from 'src/app/service/drive.service';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-drives-details',
  templateUrl: './drives-details.page.html',
  styleUrls: ['./drives-details.page.scss'],
})
export class DrivesDetailsPage implements OnInit {
  public formattedTime: any;
  public drive: any;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private driveService: DriveService,
    private userService: UserService,
    private toastController: ToastController,
    private activatedRouter: ActivatedRoute,
    private location: Location
  ) {

  }

  ngOnInit() {
    const driveId = this.activatedRouter.snapshot.paramMap.get('driveId');
    this.driveService.getDrive(driveId).subscribe(drive => {
      this.drive = drive;
      this.formattedTime = moment(this.drive.startDate.toDate()).format(
        'MMMM Do YYYY, HH:mm'
      );
    });
  }

  bookSeat() {
    // BOOK A SEAT
    this.driveService
      .bookDrive(this.userService.userDataSubject.value.uid, this.drive.id)
      .then(async (d: string) => {
        const toast = await this.toastController.create({
          message: d,
          duration: 1500
        });
        toast.present();
      })
      .catch(async (d: string) => {
        const toast = await this.toastController.create({
          message: d,
          duration: 1500
        });
        toast.present();
      });
    console.log('Booking clicked');
  }

  messageDriver() {
    // SENDING A MESSAGE
    console.log('Send message clicked');
    // this.modalController.dismiss();
    this.router.navigate([
      'tabs/tabs/chat',
      this.chatService.getChatIdWithUser(this.drive.driverId),
      this.drive.driverId,
    ]);
  }

  goBack() {
    this.location.back();
  }
}
