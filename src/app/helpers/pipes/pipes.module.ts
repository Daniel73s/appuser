import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './filter.pipe';
import { FilterMenuPipe } from './filter-menu.pipe';
import { FilterEstadoPipe } from './filter-estado.pipe';



@NgModule({
  declarations: [
    FilterPipe,
    FilterMenuPipe,
    FilterEstadoPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FilterPipe,
    FilterMenuPipe,
    FilterEstadoPipe
  ]
})
export class PipesModule { }
