import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  static_lat = 12.9069628;
  static_lng = 77.5203785;
  lat : any;
  lng : any;
  compare_lat1 : any;
  compare_lat2: any;

  compare_lng1: any;
  compare_lng2: any;
  flag: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
    this.test();
  }

  test () {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      }).catch((error) => {
      console.log('Error getting location', error);
      });

    let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      this.lat = data.coords.latitude;
      this.lng = data.coords.longitude;
      this.compare_lat1 = this.static_lat + 0.0048;
      this.compare_lat2 = this.static_lat - 0.0048;

      this.compare_lng1 = this.static_lng - 0.002;
      this.compare_lng2 = this.static_lng + 0.002;

      console.log();
      if( (this.lat <= this.compare_lat1 && this.lat >= this.compare_lat2) && (this.lng >= this.compare_lng1 && this.lat <= this.compare_lng2 ) ){
        this.flag = 'beh';
      } else {
        this.flag = 'nobeh';
      }
      });
  }

}
