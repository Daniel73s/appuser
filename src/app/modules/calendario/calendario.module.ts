import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PedidoDetalleComponent } from './pages/pedido-detalle/pedido-detalle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CalendarioPage, PedidoDetalleComponent]
})
export class CalendarioPageModule { }
