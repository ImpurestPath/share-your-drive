import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-favorite-popup',
  templateUrl: './add-favorite-popup.component.html',
  styleUrls: ['./add-favorite-popup.component.scss'],
})
export class AddFavoritePopupComponent implements OnInit {
  searchForm: FormGroup;
  @Input() popover;
  favorite: boolean;

  constructor(public fb: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      origin: ['', [Validators.required, Validators.minLength(2)]],
      destination: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  onSubmit(form: NgForm) {
    this.popover.dismiss(form.value);
  }
}
