import { Component, OnInit, Input } from '@angular/core';
import { Drive } from 'src/app/entity/drive';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  @Input() currentFilter: string;
  @Input() drives: Array<Drive>;

  constructor() { }

  ngOnInit() {
  }

}
