import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    if (this.userService.userDataSubject.value) {
      if (this.userService.userDataSubject.value.uid) {
        this.router.navigateByUrl('tabs');
        console.log(this.userService.userDataSubject.value.uid);
      }
    }
    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });
  }

  resetPassword(email) {
    this.userService
      .passwordRecover(email.value)
      .then(async () => {
        const toast = await this.toastController.create({
          message: 'Reset email was sent',
          duration: 1500,
        });
        toast.present();
      })
      .catch(async (err) => {
        const toast = await this.toastController.create({
          message: err.message,
          duration: 1500,
        });
        toast.present();
      });
  }
  get email() {
    return this.resetForm.get('email');
  }
}
