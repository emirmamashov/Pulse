import { Component } from '@angular/core';
import { NavController } from "ionic-angular";
import { FilterPharmyVar } from "../../../model/mock/filter-pharmy-mock";
import {PharmacyService} from "../../../services/pharmacy.service";
import {PharmaciesVar} from "../../../model/mock/pharmacy-mock";

@Component({
  templateUrl: 'filter-pharmacy.html',
  providers: [PharmacyService]
})

export class FilterPharmacyComponent {
  filterForPharmy = FilterPharmyVar;
  pharmacies = PharmaciesVar;

  constructor(private navCtrl: NavController, private pharmacyService: PharmacyService) {
  }

  setFilter(): void {
    this.pharmacyService.filterForPharmacies().subscribe(
      data => {
        this.pharmacies.count = data.count;
        this.pharmacies.results = [];
        for(var i=0; i<data.results.length; i++) {
          this.pharmacies.results.push(data.results[i]);
        }
        console.log(this.pharmacies);
      },
      err => {
        console.log(err);
      },
      () => console.log('Pharmacies Complete')
    );
  }

  popView(): void {
    this.navCtrl.pop();
    this.setFilter();
  }

  doSetSelected(event: any, filedName: string): void {
    console.log(event);
    console.log(this.filterForPharmy);
    switch (filedName) {
      case "company":
        this.filterForPharmy.companyId = event;
            break;
      case "openhours":
        this.filterForPharmy.openhoursId = event;
            break;
      case "country":
        this.filterForPharmy.countryId = event;
            break;
      case "city":
        this.filterForPharmy.cityId = event;
            break;
      case "region":
        this.filterForPharmy.regionId = event;
            break;
    }
    console.log(this.filterForPharmy);
  }
}
