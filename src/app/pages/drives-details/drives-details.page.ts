import { ChatService } from 'src/app/service/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as moment from 'moment';
import { DriveService } from 'src/app/service/drive.service';
import { UserService } from 'src/app/service/user.service';
import { Location } from '@angular/common';
import { Map, latLng, tileLayer, marker } from 'leaflet';
import * as L from 'leaflet';
import { MapboxService } from 'src/app/service/mapbox.service';

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
  public borderColor: any;
  public avatarColor: any;
  public isBooked: boolean;
  public isOwned: boolean;
  public map: Map;
  public passengers: any;
  public defaultPhoto: string = 'https://forwardsummit.ca/wp-content/uploads/2019/01/avatar-default.png';

  constructor(
    private router: Router,
    private chatService: ChatService,
    private driveService: DriveService,
    private userService: UserService,
    private toastController: ToastController,
    private activatedRouter: ActivatedRoute,
    private location: Location,
    private mapboxService: MapboxService
  ) { }

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


      this.passengers = [];
      this.drive.passengers.forEach((passenger) => {
        this.userService.getOtherUserData(passenger)
          .subscribe((user) => {
            (this.passengers)
              ? this.passengers.push(user.data())
              : this.passengers = [user.data()];

            console.log(this.passengers);
          })
      })
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
