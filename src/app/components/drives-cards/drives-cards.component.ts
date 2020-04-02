import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drives-cards',
  templateUrl: './drives-cards.component.html',
  styleUrls: ['./drives-cards.component.scss'],
})
export class DrivesCardsComponent implements OnInit {
  @Input() card: any;

  constructor() { }

  ngOnInit() { }

}
