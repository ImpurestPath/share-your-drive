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

  constructor(
    private userService: UserService,
    private driveService: DriveService,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.user = this.userService.userDataSubject.value;

    this.driveService.getUserDrives(this.user.uid)
      .subscribe((drives) => {
        this.drives = drives;
        console.log(this.drives);
      })
  }

  deleteDrive(driveId: string) {
    return this.driveService.delete(driveId);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  formatTime(date) {
    return moment(date).format('DD. MM. YYYY HH:mm');
  }

}
