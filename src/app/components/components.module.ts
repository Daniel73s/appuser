import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { HeaderSubpageComponent } from './header-subpage/header-subpage.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [HeaderComponent,HeaderSubpageComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    HeaderSubpageComponent,
  ]
})
export class ComponentsModule { }
