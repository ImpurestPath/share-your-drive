import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drives-card',
  templateUrl: './drives-card.component.html',
  styleUrls: ['./drives-card.component.scss'],
})
export class DrivesCardComponent implements OnInit {
  @Input() card: any;

  constructor() { }

  ngOnInit() { }

}
