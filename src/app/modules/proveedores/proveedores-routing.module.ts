import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProveedoresPage } from './proveedores.page';
import { CatalogoProveedorComponent } from './pages/catalogo-proveedor/catalogo-proveedor.component';
import { PerfilProveedorComponent } from './pages/perfil-proveedor/perfil-proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: ProveedoresPage
  },
  {
    path:'catalogo/:id',
    component:CatalogoProveedorComponent
  },
  {
    path:'perfil/:id',
    component:PerfilProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProveedoresPageRoutingModule {}
