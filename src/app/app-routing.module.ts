import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './modules/dashboard/dashboard.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'dashboard',
    component:DashboardPage,
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./modules/productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'proveedores',
    loadChildren: () => import('./modules/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./modules/historial/historial.module').then( m => m.HistorialPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
