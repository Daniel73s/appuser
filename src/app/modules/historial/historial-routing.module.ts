import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialPage } from './historial.page';
import { CalendarioPedidosComponent } from './pages/calendario-pedidos/calendario-pedidos.component';
import { DetallePedidoComponent } from './pages/detalle-pedido/detalle-pedido.component';
import { MapaProveedorComponent } from './pages/mapa-proveedor/mapa-proveedor.component';

const routes: Routes = [
  
  {
    path: ':id_proveedor',
    component: HistorialPage
  },
  {
    path:'detalle-pedido/:id_pedido',
    component:DetallePedidoComponent
  },
  {
    path:'mapa-proveedor/:id_proveedor',
    component:MapaProveedorComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialPageRoutingModule {}
