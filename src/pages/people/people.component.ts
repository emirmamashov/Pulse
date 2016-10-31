import {Component} from '@angular/core';
import {PeopleService} from '../../services/people.service';
import {Http, Response} from '@angular/http';
import {AlertController} from "ionic-angular";

@Component({
  templateUrl: 'people.html',
  providers: [PeopleService]
})
export class PeopleComponent{
  people: any;
  constructor(private peopleService: PeopleService,
              public alertCtrl: AlertController){
    this.loadPeople();
  }
  loadPeople(){
    this.peopleService.load()
      .then(data => {
        this.people = data.results;
        console.log(data);
        let promtLogin = this.alertCtrl.create({
          title: 'Войти',
          //message: 'Введите логин и пароль',
          inputs: [
            {
              name: 'login',
              type: 'text',
              placeholder: this.people[0].name.first
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
      });
  }
}
