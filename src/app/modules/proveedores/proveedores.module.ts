import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProveedoresPageRoutingModule } from './proveedores-routing.module';

import { ProveedoresPage } from './proveedores.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CatalogoProveedorComponent } from './pages/catalogo-proveedor/catalogo-proveedor.component';
import { HttpClientModule } from '@angular/common/http';
import { PerfilProveedorComponent } from './pages/perfil-proveedor/perfil-proveedor.component';
import { PipesModule } from 'src/app/helpers/pipes/pipes.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProveedoresPageRoutingModule,
    ComponentsModule,
    HttpClientModule,
    PipesModule
  ],
  declarations: [ProveedoresPage,CatalogoProveedorComponent,PerfilProveedorComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProveedoresPageModule {}
