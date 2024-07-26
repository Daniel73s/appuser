import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductosPage } from './productos.page';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';
import { AddProductoComponent } from './pages/add-producto/add-producto.component';

const routes: Routes = [
  {
    path:'addproducto',
    component:AddProductoComponent
  },
  {
    path:'detalle/:id',
    component:DetalleProductoComponent
  },
  {
    path: ':id',
    component: ProductosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductosPageRoutingModule {}
