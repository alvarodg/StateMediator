import { Component, EventEmitter, Output } from '@angular/core';

@Component( {
    selector: 'rightscreen-component',
    templateUrl: './rightscreen.component.html',
    styleUrls: ['./rightscreen.component.css']
})

export class RightScreenComponent 
{
    @Output() notify: EventEmitter<string> 
        = new EventEmitter<string>();

    closeClicked() {
      this.notify.emit('Volver');
      this.closeRightWindow();
    }

    navBarClicked() {
      this.notify.emit('Barra');
    }
   
    closeRightWindow() {
        document.getElementById('myRightScreen')
            .style.transform = "translateX(100%)";
    }

    openRightWindow() {
        document.getElementById('myRightScreen')
            .style.transform = "translateX(0%)";
    }
}
