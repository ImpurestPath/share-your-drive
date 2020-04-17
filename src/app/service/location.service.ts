import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private options: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  private lat;
  private long;
  private locationName;

  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder) { }

  getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition().then((response) => {
        this.lat = response.coords.latitude;
        this.long = response.coords.longitude;

        this.nativeGeocoder.reverseGeocode(this.lat, this.long, this.options)
          .then((result: NativeGeocoderResult[]) => {
            resolve(result);
          }).catch((error: any) => reject(error));
      })
    })
  }

}
