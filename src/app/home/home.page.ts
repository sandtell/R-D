import { Component } from '@angular/core';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // public userLat: any;
  // public userLong: any;
  public address: string;
  public fullObj;
  constructor(
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder
  ) {

    this.getUserPosition();

  }


  getUserPosition() {
    let options = {
      enableHighAccuracy: true
    };
    this.geolocation.getCurrentPosition(options).then((pos: Geoposition) => {
      // this.userLat = pos.coords.latitude;
      // this.userLong = pos.coords.longitude;
      this.getAddress(pos.coords.latitude, pos.coords.longitude);

    }, (err: PositionError) => {
      console.log('error: ' + err.message);
    });
  }


  getAddress(lat, long) {

    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lat, long, options)
      .then((result: NativeGeocoderResult[]) => {

        this.fullObj = result;

        this.address = JSON.stringify(result[0]);
        // alert(JSON.stringify(result[0]));
        console.log(JSON.stringify(result[0]));
      })
      .catch((error: any) => console.log(error));

  }



}
