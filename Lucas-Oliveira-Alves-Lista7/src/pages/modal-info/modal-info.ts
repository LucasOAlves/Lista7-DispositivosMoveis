import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ModalInfo page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal-info',
  templateUrl: 'modal-info.html',
})
export class ModalInfo {

  public user;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCrtl: ViewController) {
    this.user = navParams.get('user');
  }

  closeModal(){
    this.viewCrtl.dismiss();
  }

}
