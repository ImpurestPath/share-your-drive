import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { DriveService } from 'src/app/service/drive.service';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-my-drives',
  templateUrl: './my-drives.page.html',
  styleUrls: ['./my-drives.page.scss'],
})
export class MyDrivesPage implements OnInit {
  user: any;
  drives: Array<any>;
  uid: any;

  constructor(
    private userService: UserService,
    private driveService: DriveService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.userService.userDataSubject.subscribe((user) => {
      if (user) {
        this.uid = user.uid;

        this.getUserData();

        this.driveService.getUserDrives(this.uid)
          .subscribe((drives) => {
            this.drives = drives;
            console.log(this.drives);
          });
      }
    })
  }

  deleteDrive(driveId: string) {
    return this.driveService.delete(driveId);
  }

  getUserData() {
    this.userService.getUserData(this.uid).subscribe((doc) => {
      this.user = doc;
    })
  }

  deleteFavorite(index: number) {
    const fav = this.user.favorites[index];
    console.log(fav);
    this.userService.deleteFavorite(this.user.uid, fav.origin, fav.destination)
      .then(() => {
        console.log('deleted');
      })
  }

  dismiss() {
    this.modalController.dismiss();
  }

  formatTime(date: Date): string {
    return moment(date).format('DD.MM.YYYY HH:mm');
  }

}
