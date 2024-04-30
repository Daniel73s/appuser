import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialPage } from './historial.page';
import { CalendarioPedidosComponent } from './pages/calendario-pedidos/calendario-pedidos.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: HistorialPage
  },
  {
    path:'calendario',
    component:CalendarioPedidosComponent
  },
  {
    path:'detalle-pedido',
    component:DetallePedidoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialPageRoutingModule {}
