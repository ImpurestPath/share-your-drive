import { ChatService } from 'src/app/service/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
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
  public formattedClock: any;
  public drive: any;
  public formattedDate: any;
  public color: string;
  public test: string = '#3f3f3f';
  public borderColor: any;
  public avatarColor: any;
  public isBooked: boolean;
  public isOwned: boolean;

  constructor(
    private router: Router,
    private chatService: ChatService,
    private driveService: DriveService,
    private userService: UserService,
    private toastController: ToastController,
    private activatedRouter: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.color = this.activatedRouter.snapshot.queryParamMap.get('color');
    this.borderColor = {
      'border-left': `2.5px solid var(--ion-color-${this.color})`,
    };
    this.avatarColor = { border: `2px solid var(--ion-color-${this.color})` };

    const driveId = this.activatedRouter.snapshot.paramMap.get('driveId');
    this.driveService.getDrive(driveId).subscribe((drive) => {
      this.drive = drive;
      this.formattedClock = moment(this.drive.startDate.toDate()).format(
        'HH:mm'
      );
      this.formattedDate = moment(this.drive.startDate.toDate()).format(
        'DD. MMMM YYYY'
      );
      this.isBooked = drive.passengers.includes(
        this.userService.userDataSubject.value.uid
      );
      this.isOwned =
        drive.driverId === this.userService.userDataSubject.value.uid;
    });
  }

  bookSeat() {
    this.driveService
      .bookDrive(this.userService.userDataSubject.value.uid, this.drive.id)
      .then(async (d: string) => {
        const toast = await this.toastController.create({
          message: d,
          duration: 1500,
        });
        toast.present();
      })
      .catch(async (d: string) => {
        const toast = await this.toastController.create({
          message: d,
          duration: 1500,
        });
        toast.present();
      });
  }

  cancelBooking() {
    this.driveService
      .unbookDrive(this.userService.userDataSubject.value.uid, this.drive.id)
      .then(async (d: string) => {
        const toast = await this.toastController.create({
          message: d,
          duration: 1500,
        });
        toast.present();
      })
      .catch(async (d: string) => {
        const toast = await this.toastController.create({
          message: d,
          duration: 1500,
        });
        toast.present();
      });
    console.log('cancel booking');
  }

  messageDriver() {
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
