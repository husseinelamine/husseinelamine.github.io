import { Component, OnInit} from '@angular/core';
import {SidebarsService} from '../sidebars.service';
@Component({
selector: 'overlay',
templateUrl: './overlay.component.html',
styleUrls: ['./overlay.component.css']
})
export class OverlayComponent implements OnInit {

  openSideBarLeft(){
    this.sidebarsService.openSideBarLeft();
  }
  closeSideBarLeft(){
    this.sidebarsService.closeSideBarLeft();
  }
  toggleSideBarLeft(){
    this.sidebarsService.toggleSideBarLeft();
  }
constructor(public sidebarsService: SidebarsService) {
}

ngOnInit(){

}
}
