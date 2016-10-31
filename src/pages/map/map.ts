import {Component} from '@angular/core';
import { Geolocation } from 'ionic-native';
import {AlertController, Platform} from "ionic-angular";

declare var google;

@Component({
  styles: [`
    #map {
       height: 300px;
     }
  `],
  template: `
 <div #map id="map"></div>
`
})
export class MapComponent{
  // google maps zoom level
  zoom: number = 8;
  map: any;
  // initial center position for the map
  lat: number = 51.673858;
  lng: number = 7.815982;

  constructor(public alertCtrl: AlertController, private platform: Platform) {

  }

  onMapsReady(){
    let latLng = new google.maps.LatLng(this.lat, this.lng);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    var image = '../../assets/images/icons/32x32/14.png';

    Geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var marker = new google.maps.Marker({
        position: latLng,
        icon: image,
        animation: google.maps.Animation.DROP
      });
      this.map.setCenter(latLng);
      this.map.setZoom(15);
      marker.setMap(this.map);
    },
      (err) => {
      console.log(err);

      let alert = this.alertCtrl.create({
        title: 'Sorry!',
        subTitle: err,
        buttons: ['OK']
      });
      alert.present();
    });

  }
  ngAfterViewInit(){
    (<any>window).googleMapsReady=this.onMapsReady.bind(this);
    var script = document.createElement("script");
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyAuJo1IsFhHROn3Bv4KyIwrAQatnZMjVfY&sensor=false&callback=googleMapsReady";
    //alert('Ready!');
  }
}
