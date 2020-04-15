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
  @Input() state: boolean;

  constructor() { }

  ngOnInit() {
    console.log(this.state);
  }

}
