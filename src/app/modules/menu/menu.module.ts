import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuPageRoutingModule } from './menu-routing.module';

import { MenuPage } from './menu.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CategoriaProductosPageComponent } from './pages/categoria-productos-page/categoria-productos-page.component';
import { DetalleProductoPageComponent } from './pages/detalle-producto-page/detalle-producto-page.component';
import { OrdenarProductoPageComponent } from './pages/ordenar-producto-page/ordenar-producto-page.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuPageRoutingModule,
    ComponentsModule
  ],
  declarations: [MenuPage,
    CategoriaProductosPageComponent,
    DetalleProductoPageComponent,
    OrdenarProductoPageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MenuPageModule {}
