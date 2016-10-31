import { Component } from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {AuthentificateService} from "../../services/authentificate.service";
import {AuthUser} from "../../model/mock/auth-user-mock";

@Component({
  templateUrl: 'setting.html',
  providers: [AuthentificateService]
})
export class SettingComponent {
  setting: string = "address";
  isAndroid: boolean = false;
  authUser = AuthUser;

  constructor(platform: Platform,
              public alertCtrl: AlertController,
              private authentificateService: AuthentificateService) {
    this.isAndroid = platform.is('android');
  }

  getCurrentAuthUser(): void {
    this.authentificateService.getCurrentUser().subscribe(
      data => {
        console.log(data);
        this.authUser.token = data.token;
        this.authUser.user.email = data.user.email;
        this.authUser.user.first_name = data.user.first_name;
        this.authUser.user.last_name = data.user.last_name;
        this.authUser.user.username = data.user.username;
        console.log("authUser: "+this.authUser);
      },
      err => {
        console.log(err);
        this.showInfo("Ошибка!", err);
      },
      () => {
        console.log("Complete!");
      }
    );
  }

  doChangePass(newPass: HTMLInputElement, confirmPass: HTMLInputElement): any {
    if (newPass.value != confirmPass.value) {
      this.showInfo("Ошибка!", "Пароль не совпадает.");
      return;
    }

    this.authentificateService.changePass(newPass.value, confirmPass.value, this.authUser.token).subscribe(
      data => {
        console.log(data);
        console.log("this.authUser: "+this.authUser);
        this.showInfo("Выполнено!", "Пароль успешно изменено.");
        newPass.value = "";
        confirmPass.value = "";
      },
      err => {
        console.log(err);
        this.showInfo("Ошибка", err);
      },
      () => {
        console.log("OK complete!");
      }
    );

  }

  showInfo(title: string, text: string): void {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons:[
        {
          text: "OK",
          type: "text"
        }
      ]
    });
    alert.present();
  }
}
