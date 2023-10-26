import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/fontawesome-free-solid';
import { faAlignLeft } from '@fortawesome/fontawesome-free-solid';
import { faShoppingCart } from '@fortawesome/fontawesome-free-solid';
import {SidebarsService} from '../sidebars.service';
@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit{
  faCoffee = faCoffee;
  faAlignLeft = faAlignLeft;
  faShoppingCart = faShoppingCart;
  cartCount=0;
  @Input() screens="nothing";
  toggleCount(){
    this.cartCount = this.cartCount == 0?99:0;
  }
  openSideBarLeft(){
    this.sidebarsService.openSideBarLeft();
  }
  closeSideBarLeft(){
    this.sidebarsService.closeSideBarLeft();
  }
  toggleSideBarLeft(){
    this.sidebarsService.toggleSideBarLeft();
  }
  get title(){
    return this.screens;
  }
  get hidden(){
    return this.cartCount == 0;
  }
  constructor(public sidebarsService: SidebarsService){

  }
  ngOnInit(){
  }
}
