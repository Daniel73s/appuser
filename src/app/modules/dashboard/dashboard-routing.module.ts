import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPage } from './dashboard.page';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo:'productos',
  //   pathMatch:'full'
  // },
  {
    path:'productos',
    loadChildren:() => import('../productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path:'menu',
    loadChildren:() => import('../menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path:'proveedores',
    loadChildren:() => import('../proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path:'historial',
    loadChildren:() => import('../historial/historial.module').then( m => m.HistorialPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardPageRoutingModule {}
