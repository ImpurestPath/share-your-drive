import { ChatService } from 'src/app/service/chat.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
  public formattedTime: any;
  public drive: any;
  public isBooked: boolean;
  public isOwned: boolean;
  public map: Map;

  // @Input() set data(value: any) {
  //   this.drive = value;
  //   this.formattedTime = moment(this.drive.startDate).format(
  //     'MMMM Do YYYY, HH:mm'
  //   );
  // }

  constructor(
    // public modalController: ModalController,
    private router: Router,
    private chatService: ChatService,
    private driveService: DriveService,
    private userService: UserService,
    private toastController: ToastController,
    private activatedRouter: ActivatedRoute,
    private location: Location,
    private mapboxService: MapboxService
  ) {}

  ngOnInit() {
    const driveId = this.activatedRouter.snapshot.paramMap.get('driveId');
    this.driveService.getDrive(driveId).subscribe((drive) => {
      this.drive = drive;
      this.isBooked = drive.passengers.includes(
        this.userService.userDataSubject.value.uid
      );
      this.isOwned =
        drive.driverId === this.userService.userDataSubject.value.uid;
      this.formattedTime = moment(this.drive.startDate.toDate()).format(
        'MMMM Do YYYY, HH:mm'
      );
      setTimeout(async () => {
        const originFeatures = await this.mapboxService
          .searchCity(drive.origin)
          .toPromise();
        const destinationFeatures = await this.mapboxService
          .searchCity(drive.destination)
          .toPromise();
        const oLat = originFeatures[0].center[1];
        const oLng = originFeatures[0].center[0];
        const dLat = destinationFeatures[0].center[1];
        const dLng = destinationFeatures[0].center[0];
        const center = [(oLat + dLat) / 2, (oLng + dLng) / 2];
        console.log([oLat, oLng]);
        console.log([dLat, dLng]);

        console.log(center);

        this.map = new Map('mapId').setView(center, 10);
        tileLayer(
          'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}'
        ).addTo(this.map);
        L.polyline([[oLat, oLng],[dLat, dLng]]).addTo(this.map);
        this.map.fitBounds([[oLat, oLng],[dLat, dLng]])
        // marker([oLat, oLng])
        //   .addTo(this.map)
        //   .bindPopup(drive.origin)
        //   .openPopup();
        // marker([dLat, dLng])
        //   .addTo(this.map)
        //   .bindPopup(drive.destination)
        //   .openPopup();

      }, 0);
    });
  }

  bookSeat() {
    // BOOK A SEAT
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

  // dismiss() {
  //   // this.modalController.dismiss();
  // }

  goBack() {
    this.location.back();
  }
}
