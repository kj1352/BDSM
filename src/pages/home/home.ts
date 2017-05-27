import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';
import { SMS } from '@ionic-native/sms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import * as $ from 'jquery';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  count = 0;
  static_lat :any;
  static_lng : any;
  lat : any;
  lng : any;
  compare_lat1 : any;
  compare_lat2: any;

  compare_lng1: any;
  compare_lng2: any;
  flag: any;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, private vibration: Vibration, private sms: SMS, public http: Http) {
    this.getdata();
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

      if( (this.lat <= this.compare_lat1 && this.lat >= this.compare_lat2) && (this.lng >= this.compare_lng1 && this.lat <= this.compare_lng2 ) ){
        this.flag = 'beh';
        if(this.count != 1){
          this.vibration.vibrate([5000,1000,5000,1000,5000]);
            //alert("message");
            this.sms.send('+917349104851', 'Hi!! I am in Danger... Here is My Location!! ==> ' + this.lat + ' , ' + this.lng);
            this.count = 1;
        }
      } else {
        this.count = 0;
        this.flag = 'nobeh';
      }
      });
  }

  getdata() {
    this.http.get('http://localhost:8000/posts').subscribe(res=>{
      console.log(res);
      var lati = JSON.parse(res['_body'])[0].static_lat;
      this.static_lat = parseFloat(lati);
      var longi = JSON.parse(res['_body'])[0].static_lng;
      this.static_lng = parseFloat(longi);
      //console.log(this.static_lat);
  });
  }

}
