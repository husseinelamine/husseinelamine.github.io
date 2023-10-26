
import { Injectable } from '@angular/core';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SidebarsService {
    sidebarleft: boolean = false;
    sidebarright: boolean = false;
    openSideBarLeft(){
      this.sidebarleft = true;
    }
    closeSideBarLeft(){
      this.sidebarleft = false;
      if(this._location.path(true) == "#menu")
        this._location.back();
    }
    toggleSideBarLeft(){
      if(this.sidebarleft)
        this.closeSideBarLeft();
      else
        this.openSideBarLeft();
    }
    constructor(private _location: Location) { }

}
