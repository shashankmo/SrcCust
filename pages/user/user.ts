import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {AuthService} from "../../services/auth-service";


/*
 Generated class for the LoginPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user = {};

  constructor(public nav: NavController, public authService: AuthService, public toastCtrl: ToastController) {
    this.user = authService.getUserData();
  }

  // save user info
  submit() {
    this.authService.updateUserData(this.user);

    let toast = this.toastCtrl.create({
      message: 'User updated',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}
