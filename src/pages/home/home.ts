import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import {AuthentificateService} from "../../services/authentificate.service";
import {AuthUser} from "../../model/mock/auth-user-mock";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [AuthentificateService]
})
export class HomePage {
  loginData: any;
  authUser = AuthUser;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              private authentificateService: AuthentificateService) {
  }

  doLogin(): void {
    let promtLogin = this.alertCtrl.create({
      title: 'Войти',
      //message: 'Введите логин и пароль',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'логин'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'пароль'
        }
      ],
      buttons: [
        {
          text: 'Войти',
          handler: data => {
            console.log(data.login);
            console.log(data.password);
            this.login(data.login, data.email, data.password);
          }
        },
        {
          text: 'Отмена',
          handler: data => {
            console.log("cancel");
          }
        }
      ]
    });
    promtLogin.present();
  }

  doRegistr(): void {
    let promtRegistr = this.alertCtrl.create({
      title: 'Регистрация',
      inputs: [
        {
          name: 'username',
          type: 'text',
          placeholder: 'логин'
        },
        {
          name: 'email',
          type: 'text',
          placeholder: 'email'
        },
        {
          name: 'password',
          type: 'password',
          placeholder: 'пароль'
        },
        {
          name: 'confirmPassword',
          type: 'password',
          placeholder: 'потверждение'
        }
      ],
      buttons: [
        {
          text: 'Зарегистрироваться',
          handler: data => {
            console.log(data);
            this.registr(data.username, data.email, data.password, data.confirmPassword);
          }
        },
        {
          text: 'Отмена',
          handler: data => {
            console.log('cancel');
          }
        }
      ]
    });
    promtRegistr.present();
  }

  openSearchPage():void {
    //this.nav.push(NavigationDetailsPageComponent, { item: item });
    this.navCtrl.push(TabsPage, {authUser: this.authUser});
  }

  login(username: string, email: string, password: string): void {
    this.authentificateService.login(username, email, password).subscribe(
      data => {
        this.loginData = data;
        this.authUser.token = data.token;
        this.authUser.user.email = data.user.email;
        this.authUser.user.first_name = data.user.first_name;
        this.authUser.user.last_name = data.user.last_name;
        this.authUser.user.username = data.user.username;
        console.log(data);
      },
      err => {
        console.log(err);
        this.showInfo("Ошибка!", "Логин или пароль не правильно введены.");
      },
      () => {
        console.log("Login complete!");
        this.openSearchPage();
      }
    );
  }

  registr(username: string, email: string, password1: string, password2: string): void {
    this.authentificateService.registr(username, email, password1, password2).subscribe(
      data => {
         console.log(data);
        this.login(username, email, password1);
      },
      err => {
        console.log(err);
        this.showInfo("Ошибка!", err);
      },
      () => {
        console.log("Complete! registr");
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
