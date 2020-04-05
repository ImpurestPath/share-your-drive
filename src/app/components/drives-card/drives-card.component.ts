import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-drives-card',
  templateUrl: './drives-card.component.html',
  styleUrls: ['./drives-card.component.scss'],
})
export class DrivesCardComponent implements OnInit {
  public drive: any;
  public formattedTime: any;

  @Input() set data(value: any) {
    this.drive = value;
    this.drive.startDate = moment(this.drive.startDate.toDate());
    this.formattedTime = this.drive.startDate.fromNow();
  }

  constructor() { }

  ngOnInit() {

  }

  openDetails() {
    // CODE TO OPEN DETAIL PAGES
  }

}
