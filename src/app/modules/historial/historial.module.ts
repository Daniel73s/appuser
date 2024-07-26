import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialPageRoutingModule } from './historial-routing.module';

import { HistorialPage } from './historial.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CalendarioPedidosComponent } from './pages/calendario-pedidos/calendario-pedidos.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { MapaComponent } from './modals/mapa/mapa.component';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialPageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [HistorialPage,CalendarioPedidosComponent,DetallePedidoComponent,MapaComponent]
})
export class HistorialPageModule {}
