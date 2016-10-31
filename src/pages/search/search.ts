import { Component } from '@angular/core';

import {PharmacyService} from "../../services/pharmacy.service";
import {SearchDetail} from "./search-detail/search-detail";
import {NavController, AlertController} from "ionic-angular";


declare var SpeechRecognition: any;
@Component({
  templateUrl: 'search.html',
  providers:[PharmacyService]
})

export class SearchComponent {
  drugs: any;
  searchVal: string;
  recognition: any;

  constructor(private pharmacyService: PharmacyService,
              public navController: NavController,
              public alertCtrl: AlertController){

  }

  search(event: any): void {
    this.searchVal = event.srcElement.value;
    console.log(event);
    this.pharmacyService.findDrugs(event.srcElement.value).subscribe(
        data => {
          this.drugs = data;
          console.log(data);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log('Drugs search complete!');
        }
    );
  }

  textToSpeech(): void {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = 'en-US';
        this.recognition.onnomatch = (event => {
          console.log('No match found.');
          //this.showAlert('No match found.');
        });
        this.recognition.onerror = (event => {
          console.log('Error happens.');
          //this.showAlert('Error happens.');
        });
        this.recognition.onresult = (event => {
          if (event.results.length > 0) {
            console.log('Output STT: ', event.results[0][0].transcript);
            //this.showAlert('Output STT: ' + event.results[0][0].transcript);
          }
        });
        this.recognition.start();
  }

  showAlert(content: string): void {
    let alert = this.alertCtrl.create({
      title: 'Sorry! Error',
      subTitle: content,
      buttons: ['OK']
    });
    alert.present();
  }

  itemTapped(event: any, drug: string): void {
    console.log("send drug: "+drug);
    this.navController.push(SearchDetail, {
      drug: drug
    });
  }

  searchFilterCompany(searchText: string, companyId: number): void {
      this.pharmacyService.filterSearchCompanyDrug(searchText, companyId).subscribe(
        data => {
          this.drugs = data;
          console.log("search with filter: "+data);
        },
        err => {
          console.log(err);
        },
        () => {
          console.log("Search with filter complete!");
        }
      );
  }

  openFilter(event: any): void {
    let promtFilter = this.alertCtrl.create({title: "Фильтры полей"});
    promtFilter.addInput({
      type: "checkbox",
      label: "Неман",
      value: "1",
      checked: false
    });

    promtFilter.addButton("отмена");
    promtFilter.addButton({
      text: "Фильтровать",
      handler: data => {
        this.searchFilterCompany(this.searchVal, data[0]);
        console.log(data);
      }
    });
    promtFilter.present();
  }

 /* onFocus(): void {
    document.getElementById("logo").style.width = "50%";
  }

  outFocus(): void {
    document.getElementById("logo").style.width = "60%";
  }*/
}
