import { Component } from '@angular/core';
import {AlertController} from "ionic-angular";

@Component({
  templateUrl: 'mylists.html'
})
export class MyListsComponent {
  isSearch: boolean = false;

  constructor(public alertCtrl: AlertController) {

  }

  getItems(event: any): any {}

  setIsSearch(): void {
    this.isSearch = this.isSearch ? false : true;
  }

  doCreateNewList() {
    let promtCreateNewList = this.alertCtrl.create({
      title: 'Создать новый список',
      inputs: [
        { name: 'name', type: 'text', placeholder: 'Наименование' },
      ],
      buttons: [
        {
          text: 'Создать',
          handler: data => {
            console.log(data.name);
          }
        },
        {
          text: 'Отмена'
        },
      ]
    });
    promtCreateNewList.present();
  }

}
