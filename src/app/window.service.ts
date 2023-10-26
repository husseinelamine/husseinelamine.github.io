
import { Injectable } from '@angular/core';

@Injectable()
export class WindowService {
    screensize;
    constructor() { }
    setScreen(size){
      this.screensize = size;
    }
    getScreen(){
      return this.screensize;
    }
}
