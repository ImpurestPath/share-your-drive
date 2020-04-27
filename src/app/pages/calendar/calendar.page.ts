import { Component, OnInit, Input } from '@angular/core';
import { DriveService } from 'src/app/service/drive.service';
import { CalendarComponentOptions, DayConfig } from 'ion2-calendar';
import * as moment from 'moment';
import { ModalController } from '@ionic/angular';
import { DrivesDetailsPage } from './../../pages/drives-details/drives-details.page';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
   forSearch = [];
   dateForSearch:string;
   ykkonen : any;
   kakkonen : any;
   seatsTaken : number;
   //public drive: any;

  _daysConfig: DayConfig[] = [];
  date: string;
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  drives: Array<any>;
  //drive: Array<any>;
  options:CalendarComponentOptions = {
    monthFormat: 'MMMM',
    monthPickerFormat: ['Tammikuu','Helmikuu','Maaliskuu','Huhtikuu','Toukokuu','Kesäkuu','Heinäkuu','Elokuu','Syyskuu','Lokakuu','Marraskuu','Joulukuu'],
    weekdays: ['M','T','K','T','P','L','S'],
    weekStart: 0,
    daysConfig: this._daysConfig
  };
  constructor(private driveService: DriveService, public modalController: ModalController,private router: Router) { }

  ngOnInit() {
    this.driveService.getAll().subscribe((drives) => {
    this.drives = drives;
    //this.drive = drives;
    this.initCalendarData();
    console.log(drives);
  })
  }

  onChange($event) {
    //console.log($event);
  }

  onSelect($event) {
    this.forSearch = [];
    //console.log($event);
    //console.log($event.time / 1000);
    this.drives.forEach((el) => {
     // console.log(el.startDate.seconds);
      this.ykkonen = $event.time / 1000;
      this.kakkonen = ($event.time / 1000) + (86399999 / 1000);
      this.seatsTaken = el.seatsMax - el.seatsLeft;
      if(el.startDate.seconds >= ($event.time / 1000) && el.startDate.seconds < (($event.time / 1000) + (86399999 / 1000))) {
        let dateForSearch = el.startDate;
        this.forSearch.push(dateForSearch)
        //console.log(this.forSearch);
      }})
  
    //console.log(this.forSearch);
  }

  initCalendarData() {
    this.drives.forEach((el) => {
      let date = el.startDate.toDate();
      this._daysConfig.push({
        date: new Date(date),
        marked: true,
      })
    })
    //OTA ENSIN TALTEEN DATA JOHONKI MUUTTUJAAN JA SITTE FORMATOI OIKEESEE MUOTOO!
    //ESIM ALLA OLEVA EI TOIMI KU DRIVEÄ EI OO OLEMASA
    //this.formattedTime = moment(this.drive.startDate).format('MMMM Do YYYY, HH:mm');
  
  }/*
  async openDetails() {
    const modal = await this.modalController.create({
      component: DrivesDetailsPage,
      componentProps: {
        data: this.drives
      }
    });
    return await modal.present();
  }
  */
 clicked(driveId) {
     this.router.navigate(['../../../tabs/tabs/drives', driveId], {
       queryParams: { color:'primary'},
     });
   }
}
