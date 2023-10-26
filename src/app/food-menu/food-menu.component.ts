import { Component, OnInit, Input } from '@angular/core';
import { faPlus } from '@fortawesome/fontawesome-free-solid';
import { WindowService } from '../window.service';

@Component({
selector: 'food-menu-component',
templateUrl: './food-menu.component.html',
styleUrls: ['./food-menu.component.css']
})
export class FoodMenuComponent implements OnInit {
  @Input() screens;
  faPlus = faPlus;
  iconelv = 2;
constructor(
  private windowService:WindowService,
) {
};
elvDown(){
  console.log("down");
  this.iconelv = 1;
}
elvUp(){
  console.log("up");
  this.iconelv = 2;
}
addItem(){

}
ngOnInit(){

};
}
