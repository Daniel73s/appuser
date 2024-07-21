import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { CategoriaProductosPageComponent } from './pages/categoria-productos-page/categoria-productos-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { OrdenarProductoPageComponent } from './pages/ordenar-producto-page/ordenar-producto-page.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPage
  },
  {
    path:'categoria/:id',
    component:CategoriaProductosPageComponent
  },
  {
    path:'detalle-producto/:id',
    component:DetalleProductoPageComponent
  },
  {
    path:'ordenar-producto/:id',
    component:OrdenarProductoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
