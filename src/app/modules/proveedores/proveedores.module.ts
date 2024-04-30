import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogoProveedorComponent } from './pages/catalogo-proveedor/catalogo-proveedor.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ProveedoresPage,CatalogoProveedorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProveedoresPageModule {}
