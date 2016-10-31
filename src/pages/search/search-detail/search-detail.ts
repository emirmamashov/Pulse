import { Component } from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {PharmacyService} from "../../../services/pharmacy.service";

declare var google;

@Component({
  templateUrl: 'search-detail.html',
  providers: [PharmacyService]
})

export class SearchDetail {
  drug: any;
  detailsOfDrug: any;
  image: string = '/android_asset/www/assets/images/icons/32x32/14.png';
  constructor(private navParams: NavParams,
              private pharmacySerive: PharmacyService,
              private navCtrl: NavController){
    this.drug = navParams.get('drug');
    this.getDetailsOfDrug();
  }

  getDetailsOfDrug(): void {
    this.pharmacySerive.getDetailsDrug(this.drug.id).subscribe(
      data => {
        this.detailsOfDrug = data;
      },
      err => {
        console.log(err);
      },
      () => {
        console.log("detailsOfDrug complete!");
      }
    );
  }

  doViewDisplay(event: any, elemId: string): void {
    var elem = document.getElementById(elemId);
    var offElem = document.getElementById("off_"+elemId);
    var onElem = document.getElementById("on_"+elemId);

    if(elem.style.display == "none") {
      var details:any = document.getElementsByClassName("details");
      for(var i=0; i<details.length; i++) {
        if(elem != details[i] && details[i].style.display != "none") {
          var this_offElem = document.getElementById("off_"+details[i].id);
          var this_onElem = document.getElementById("on_"+details[i].id);

          if(details[i].style.display != "none") {
            details[i].style.display = "none";
            this_onElem.style.display = "";
            this_offElem.style.display = "none";
          }
        }
      }
      onElem.style.display = "none";
      offElem.style.display = "";
      elem.style.display = "";

    } else {
      onElem.style.display = "";
      offElem.style.display = "none";
      elem.style.display = "none";
    }



    if (elem.getAttribute("isload") == "0") {
      elem.setAttribute("isload", "1");

      if (elemId == "geolocation" && this.detailsOfDrug) {
        console.log("this.detailsOfDrug: "+this.detailsOfDrug);
        var map = document.getElementById("details_"+this.detailsOfDrug.pharmacy.id);
        if(map)
          this.initilizeMap(map, this.detailsOfDrug.pharmacy.position.split(','));
      }

    }

  }

  initilizeMap(map: any, position: Array<string>): void {
    let latLng = new google.maps.LatLng(position[0], position[1]);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var newMap = new google.maps.Map(map, mapOptions);
    var marker = new google.maps.Marker({
      position: latLng,
      icon: this.image,
      animation: google.maps.Animation.DROP
    });
    newMap.setCenter(latLng);
    newMap.setZoom(15);
    marker.setMap(newMap);

    /*Geolocation.getCurrentPosition().then((position) => {
     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     var marker = new google.maps.Marker({
     position: latLng,
     icon: this.image,
     animation: google.maps.Animation.DROP
     });
     newMap.setCenter(latLng);
     newMap.setZoom(15);
     marker.setMap(newMap);
     },
     (err) => {
     console.log(err);

     let alert = this.alertCtrl.create({
     title: 'Sorry!',
     subTitle: err,
     buttons: ['OK']
     });
     alert.present();
     });*/
  }

  popView(): void {
    this.navCtrl.pop();
  }
}
