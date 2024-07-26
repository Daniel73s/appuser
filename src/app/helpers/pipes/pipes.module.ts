import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterMenuPipe } from './filter-menu.pipe';
import { FilterEstadoPipe } from './filter-estado.pipe';
import { FilterPedidoPipe } from './filter-pedido.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterMenuPipe,
    FilterEstadoPipe,
    FilterPedidoPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe,
    FilterMenuPipe,
    FilterEstadoPipe,
    FilterPedidoPipe
  ]
})
export class PipesModule { }
