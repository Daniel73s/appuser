import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductosPageRoutingModule } from './productos-routing.module';

import { ProductosPage } from './productos.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';
import { DetalleProductoComponent } from './pages/detalle-producto/detalle-producto.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductosPageRoutingModule,
    ComponentsModule,
    PipesModule,
    ReactiveFormsModule
  ],
  declarations: [ProductosPage,DetalleProductoComponent]
})
export class ProductosPageModule {}
