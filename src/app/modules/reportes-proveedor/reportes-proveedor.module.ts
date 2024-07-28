import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportesProveedorPageRoutingModule } from './reportes-proveedor-routing.module';

import { ReportesProveedorPage } from './reportes-proveedor.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportesProveedorPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ReportesProveedorPage]
})
export class ReportesProveedorPageModule {}
