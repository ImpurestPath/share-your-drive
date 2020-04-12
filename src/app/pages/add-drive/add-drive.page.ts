import { ModalController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import * as moment from 'moment';
import { DriveService } from 'src/app/service/drive.service';
import { Drive } from '../../entity/drive';
import { UserService } from 'src/app/service/user.service';
import { MapboxService } from 'src/app/service/mapbox.service';
import { map } from 'rxjs/operators';
import { Feature } from '../../service/mapbox.service';

@Component({
  selector: 'app-add-drive',
  templateUrl: './add-drive.page.html',
  styleUrls: ['./add-drive.page.scss']
})
export class AddDrivePage implements OnInit {
  addForm: FormGroup;
  origins: string[] = [];
  destinations: string[] = [];
  selectedOrigin = null;
  selectedDestination = null;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private driveService: DriveService,
    private userService: UserService,
    private mapboxService: MapboxService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      origin: ['', Validators.required, Validators.minLength(2)],
      destination: ['', Validators.required, Validators.minLength(2)],
      dateDay: ['', Validators.required],
      dateTime: ['', Validators.required],
      duration: ['', Validators.required],
      seatsMax: ['', Validators.required],
      seatsLeft: ['', Validators.required],
      info: '',
    })
  }

  onSubmit(form) {
    const data = form.value;
    const drive: Drive = {
      origin: data.origin,
      destination: data.destination,
      startDate: this.formatDate(data.dateDay, data.dateTime),
      finishDate: this.formatDate(data.dateDay, data.dateTime, data.duration),
      createdAt: new Date(),
      driverId: this.userService.userData.uid,
      seatsMax: Number(data.seatsMax),
      seatsLeft: Number(data.seatsLeft),
      passengers: [],
      info: data.info
    }

    this.driveService.create(drive);
    this.dismiss();
  }

  search(event: any, type: string) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapboxService
        .searchCity(searchTerm)
        .subscribe((features: Feature[]) => {
          (type === 'origin')
            ? this.origins = features.map(feature => `${feature.place_name.split(',')[0]}, ${feature.place_name.split(',')[1]}`)
            : this.destinations = features.map(feature => `${feature.place_name.split(',')[0]}, ${feature.place_name.split(',')[1]}`);
        })
    } else {
      (type === 'origin')
        ? this.origins = []
        : this.destinations = [];
    }
  }

  onSelect(address: string, type: string) {
    if (type === 'origin') {
      this.selectedOrigin = address.split(',')[0];
      this.origins = [];
    } else {
      this.selectedDestination = address.split(',')[0];
      this.destinations = [];
    }

  }

  formatDate(day, time, duration?) {
    day = moment(day).format('DD-MM-YYYY');
    time = moment(time).format('HH:mm');
    const fullDate = moment(`${day} ${time}`, 'DD-MM-YYYY HH:mm');
    if (duration) {
      return fullDate.add('hours', duration).toDate();
    } else {
      return fullDate.toDate();
    }
  }

  dismiss() {
    this.modalController.dismiss();
  }
}
