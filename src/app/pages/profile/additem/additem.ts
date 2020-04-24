import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-additem',
  templateUrl: 'additem.html'
})
export class AddItemPage {

  selectedItem: any;

  constructor(
    public navCtrl: NavController, 
    public view: ViewController,
    public navParams: NavParams) {
    this.selectedItem = this.navParams.get('selectedItem');
  }

  saveItem(){
    console.log('saved item: ', this.selectedItem);
    this.view.dismiss(this.selectedItem);
  }

  close(){
    this.view.dismiss();
  }

}