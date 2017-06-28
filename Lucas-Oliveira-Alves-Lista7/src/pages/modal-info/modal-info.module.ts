import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalInfo } from './modal-info';

@NgModule({
  declarations: [
    ModalInfo,
  ],
  imports: [
    IonicPageModule.forChild(ModalInfo),
  ],
  exports: [
    ModalInfo
  ]
})
export class ModalInfoModule {}
