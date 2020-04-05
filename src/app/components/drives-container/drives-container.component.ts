import { DriveService } from './../../service/drive.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drives-container',
  templateUrl: './drives-container.component.html',
  styleUrls: ['./drives-container.component.scss'],
})
export class DrivesContainerComponent implements OnInit {
  public currentFilter: any = 'Kyydit lähellä sinua';
  // public drives: Array<any>;
  public drives: Array<any>;

  constructor(private driveService: DriveService) { }

  ngOnInit() {
    this.driveService.getRecent(10).subscribe(drives => this.drives = drives);
  }

}
