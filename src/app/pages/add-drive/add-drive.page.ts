import { ModalController } from '@ionic/angular'
import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import * as moment from 'moment';
import { DriveService } from 'src/app/service/drive.service';
import { Drive } from '../../entity/drive';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-drive',
  templateUrl: './add-drive.page.html',
  styleUrls: ['./add-drive.page.scss']
})
export class AddDrivePage implements OnInit {
  addForm: FormGroup;

  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    private driveService: DriveService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      origin: ['', Validators.required],
      destination: ['', Validators.required],
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
