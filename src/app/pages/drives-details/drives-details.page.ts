import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as moment from 'moment';

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
    this.formattedTime = moment(this.drive.startDate).format('MMMM Do YYYY, HH:mm');
  }

  constructor(public modalController: ModalController) { }

  ngOnInit() {
    console.log(this.drive);
  }

  bookSeat() {
    // BOOK A SEAT
    console.log('Booking clicked');
  }

  messageDriver() {
    // SENDING A MESSAGE
    console.log('Send message clicked');
  }

  dismiss() {
    this.modalController.dismiss();
  }

}
