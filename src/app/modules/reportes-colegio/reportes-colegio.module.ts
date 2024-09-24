import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesColegioPageRoutingModule } from './reportes-colegio-routing.module';

import { ReportesColegioPage } from './reportes-colegio.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesColegioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportesColegioPage]
})
export class ReportesColegioPageModule {}
