import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';


import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { DrivesSearchPopupComponent } from './components/drives-search-popup/drives-search-popup.component'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AddFavoritePopupComponent } from './components/add-favorite-popup/add-favorite-popup.component'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { DrivesActionComponent } from './components/drives-action/drives-action.component';

@NgModule({
  declarations: [AppComponent, DrivesSearchPopupComponent, AddFavoritePopupComponent],
  entryComponents: [DrivesSearchPopupComponent, AddFavoritePopupComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],

  providers: [
    Geolocation,
    NativeGeocoder,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
