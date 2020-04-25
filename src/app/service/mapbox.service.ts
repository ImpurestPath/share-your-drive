import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
  center: Array<number>;
}

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  searchCity(query: string) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    return this.http
      .get(
        `${url}${query}.json?access_token=${environment.mapbox.token}&cachebuster=1586587728676&autocomplete=true&country=fi&types=place&limit=5&languageMode=strict`
      )
      .pipe(
        map((res: MapboxOutput) => {
          return res.features;
        })
      );
  }
}
