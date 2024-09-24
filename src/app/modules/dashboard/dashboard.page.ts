import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from './services/usuario.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  public appPages: any[] = [];

  public user: any;
  constructor(private router: Router,
    private _storage: StorageService,
    private _usuario: UsuarioService) { }

  ionViewWillEnter() {
    this.getUsuario();
  }

  public salir() {
    this._storage.deleteToken().then(() => {
      this._storage.deleteDataUser().then(() => {
        this.router.navigate(['/auth']);
      })
    })
  }


  public getUsuario() {
    this._storage.getDataUser().then((resp: any) => {
      this.user = resp;
      if (resp.rol == 'COLEGIO') {
        this.appPages = [
          { title: 'Catalogo de productos', url: '/dashboard/menu', icon: 'fast-food' },
          { title: 'Proveedores', url: '/dashboard/proveedores', icon: 'people' },
          { title: 'Calendario', url: `/dashboard/calendario/${resp.id_colegio}`, icon: 'calendar' },
          { title: 'Reportes', url: `/dashboard/reportesc/${resp.id_colegio}`, icon: 'document' },
        ]
        this.router.navigate(['/dashboard/menu']);
      } else if (resp.rol == 'PROVEEDOR') {
        this.appPages = [
          { title: 'Productos', url: `/dashboard/productos/${resp.id_proveedor}`, icon: 'list' },
          { title: 'Pedidos', url: `/dashboard/historial/${resp.id_proveedor}`, icon: 'cart' },
          { title: 'Reportes', url: `/dashboard/reportesp/${resp.id_proveedor}`, icon: 'document' },
        ]
        this.router.navigate(['/dashboard/productos/', resp.id_proveedor]);
      }
    });
  }
}
