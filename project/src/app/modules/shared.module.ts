import { CommonModule } from '@angular/common';
import { DropDownDirective } from '../directives/drop-down.directive';
import { NgModule } from '@angular/core';


@NgModule({
    declarations:[
        DropDownDirective
    ]
    ,
    exports:[
        CommonModule,
        DropDownDirective
    ]
})
export class SharedModule {

}