import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {SidebarsService} from './sidebars.service';
import { HostListener } from '@angular/core';
import { WindowService } from './window.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.code == "Backspace" && this._location.path(true) != "")
      this._location.back();
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.windowService.setScreen(window.innerWidth);
  }
  active: boolean = false;
  title = 'app';
  constructor(
      private _location: Location,
      private sidebarService: SidebarsService,
      private windowService: WindowService,
    ){
    if(_location.path(true) == "#menu")
      _location.go("");
    _location.onUrlChange((url, state)=>{
      if(url == "" || url == "/")
        sidebarService.closeSideBarLeft();
      else if(url == "/#menu" || url == "#menu")
        sidebarService.openSideBarLeft();
    });
  }
  ngOnInit(){
    this.windowService.setScreen(window.innerWidth);
  }

}
