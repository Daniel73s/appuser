import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from './services/usuario.service';
import { jwtDecode } from 'jwt-decode';
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
    this._storage.deleteToken().then(()=>{
      this._storage.deleteDataUser().then(()=>{
        this.router.navigate(['/auth']);
      })
    })
  }


  public getUsuario() {
    console.log('se ejecuta esto');
    this._storage.getDataUser().then((resp: any) => {
      this.user=resp;
      console.log(this.user);
      if (resp.rol == 'COLEGIO') {
        this.appPages = [
          { title: 'Catalogo de productos', url: '/dashboard/menu', icon: 'fast-food' },
          { title: 'Proveedores', url: '/dashboard/proveedores', icon: 'people' },
          { title: 'Calendario', url: '/dashboard/calendario', icon: 'calendar' },
        ]
      } else {
        this.appPages = [
          { title: 'Mis Productos', url: '/dashboard/productos', icon: 'list' },
          { title: 'Historial', url: '/dashboard/historial', icon: 'cart' },
          
        ]
      }
    });
  }
}
