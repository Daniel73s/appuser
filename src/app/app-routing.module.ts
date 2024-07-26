import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './modules/dashboard/dashboard.page';
import { AuthGuard } from './helpers/guards/auth.guard';
import { LoginGuard } from './helpers/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    canActivate:[LoginGuard],
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'dashboard',
    component:DashboardPage,
    canActivate:[AuthGuard],
    loadChildren: () => import('./modules/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'calendario',
    loadChildren: () => import('./modules/calendario/calendario.module').then( m => m.CalendarioPageModule)
  }
  // ,
  // {
  //   path: 'productos',
  //   loadChildren: () => import('./modules/productos/productos.module').then( m => m.ProductosPageModule)
  // },
  // {
  //   path: 'menu',
  //   loadChildren: () => import('./modules/menu/menu.module').then( m => m.MenuPageModule)
  // },
  // {
  //   path: 'proveedores',
  //   loadChildren: () => import('./modules/proveedores/proveedores.module').then( m => m.ProveedoresPageModule)
  // },
  // {
  //   path: 'historial',
  //   loadChildren: () => import('./modules/historial/historial.module').then( m => m.HistorialPageModule)
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
