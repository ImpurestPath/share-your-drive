import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'


@Component({
  selector: 'app-drives-search-popup',
  templateUrl: './drives-search-popup.component.html',
  styleUrls: ['./drives-search-popup.component.scss'],
})
export class DrivesSearchPopupComponent implements OnInit {
  searchForm: FormGroup;
  @Input() popover;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      origin: ['', [Validators.required, Validators.minLength(2)]],
      destination: ['', [Validators.required, Validators.minLength(2)]],
      date: ''
    })
  }

  onSubmit(form: NgForm) {
    this.popover.dismiss(form.value);
  }
}
