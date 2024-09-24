import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportesColegioPage } from './reportes-colegio.page';

const routes: Routes = [
  {
    path: ':id_colegio',
    component: ReportesColegioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportesColegioPageRoutingModule {}
