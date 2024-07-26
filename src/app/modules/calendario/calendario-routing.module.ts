import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalendarioPage } from './calendario.page';
import { PedidoDetalleComponent } from './pages/pedido-detalle/pedido-detalle.component';

const routes: Routes = [
  {
    path: ':id',
    component: CalendarioPage
  },
  {
    path:'pedido-detalle/:id',
    component:PedidoDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarioPageRoutingModule {}
