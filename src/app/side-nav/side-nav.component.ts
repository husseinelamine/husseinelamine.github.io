import { Component, OnInit } from '@angular/core';
import {faSearch} from '@fortawesome/fontawesome-free-solid'
import {faPlus} from '@fortawesome/fontawesome-free-solid'
import {faTimes} from '@fortawesome/fontawesome-free-solid'
import {SidebarsService} from '../sidebars.service';
@Component({
selector: 'side-nav',
templateUrl: './side-nav.component.html',
styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
faSearch = faSearch;
faPlus = faPlus;
faTimes = faTimes;
constructor(public sidebarsService: SidebarsService) {
};

ngOnInit(){

};
}
