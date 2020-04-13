import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  @Input() currentFilter: any;
  @Input() drives: Array<any>;

  constructor() { }

  ngOnInit() {
  }

}
