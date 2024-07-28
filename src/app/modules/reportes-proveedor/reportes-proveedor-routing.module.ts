import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesProveedorPage } from './reportes-proveedor.page';

const routes: Routes = [
  {
    path: ':id',
    component: ReportesProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesProveedorPageRoutingModule {}
