import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-drives-card',
  templateUrl: './drives-card.component.html',
  styleUrls: ['./drives-card.component.scss'],
})
export class DrivesCardComponent implements OnInit {
  public card: any;
  public formattedTime: any;

  @Input() set drive(value: any) {
    this.card = value;
    this.card.startDate = moment(this.card.startDate.toDate());
    this.formattedTime = this.card.startDate.fromNow();
  }

  constructor() { }

  ngOnInit() {

  }

  openDetails() {
    // CODE TO OPEN DETAIL PAGES
  }

}
