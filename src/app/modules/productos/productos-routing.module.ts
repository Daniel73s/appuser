import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductosPage
  },
  {
    path:'detalle/:id',
    component:DetalleProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
