import { Component } from '@angular/core';

import { Geolocation } from 'ionic-native';
import {AlertController, Platform, NavController, LoadingController} from "ionic-angular";
import {PharmacyService} from "../../services/pharmacy.service";
import {FilterPharmacyComponent} from "./filter/filter-pharmacy";
import {FilterPharmyVar} from "../../model/mock/filter-pharmy-mock";
import {PharmaciesVar} from "../../model/mock/pharmacy-mock";
import {AuthUser} from "../../model/mock/auth-user-mock";

declare var google;

@Component({
  templateUrl: 'pharmacy.html',
  providers: [PharmacyService]
})
export class PharmacyComponent {
  isSearch: boolean = false;
  isReadyMap: boolean = false;
  pharmacies = PharmaciesVar;
  // google maps zoom level
  zoom: number = 16;
  map: any;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;
  image: string = '/android_asset/www/assets/images/icons/32x32/14.png';
  filterForPharmy = FilterPharmyVar;
  authUser = AuthUser;

  constructor(public alertCtrl: AlertController,
              private pharmacyService: PharmacyService,
              public navCtrl: NavController,
              public loadingCtrl: LoadingController
  ) {

  }

  viewMap(id: string, position: string): void {
    var map: any = document.getElementById(id);
    map.style.display = map.style.display == "none" ? "" : "none";
    if (map.getAttribute('isload') == "0") {
      this.initilizeMap(map, position.split(','));
      map.setAttribute('isload', 1);
    }
  }

  initilizeMap(map: any, position: Array<string>): void {
    let latLng = new google.maps.LatLng(position[0], position[1]);
    let mapOptions = {
      center: latLng,
      zoom: this.zoom,
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

  onMapsReady(): void {
    this.isReadyMap = true;
  }

  setFilterPharmacy(event: any): any{

  }

  viewPharmacies(): void {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 1000
    });
    loader.present();
    console.log("authUser: "+this.authUser.token);

    console.log("this.pharmacies): "+this.pharmacies);
    this.pharmacyService.getAll().subscribe(
      data => {
        this.pharmacies.count = data.count;
        this.pharmacies.results = [];
        this.pharmacies.results = data.results;
        /*for(var i=0; i<data.results.length; i++) {
          this.pharmacies.results.push(data.results[i]);
        }*/
        console.log(data);
        console.log("this.pharmacies: "+this.pharmacies);
      },
      err => {
        console.log(err);
      },
      () => console.log('Pharmacies Complete')
    )
  }

  viewFilterPage(): void {
    this.navCtrl.push(FilterPharmacyComponent);
    console.log(this.filterForPharmy);
  }

  ngAfterViewInit(): void {
    (<any>window).googleMapsReady=this.onMapsReady.bind(this);
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAuJo1IsFhHROn3Bv4KyIwrAQatnZMjVfY&sensor=false&callback=googleMapsReady";
    //alert('Ready!');
    this.viewPharmacies();
  }
}
