import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { ProveedoresService } from './services/proveedores.service';
register();
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
  styleUrls: ['./proveedores.page.scss'],
})
export class ProveedoresPage implements OnInit {
  public proveedores:any[]=[];
  public texto:string='';
  constructor(private router: Router,private _proveedores:ProveedoresService) { }

  ngOnInit() {
    this.getProveedores();
  }

  public buscar(e:any){
    this.texto=e.detail.value;
  }
  public opencatalogo(idProveedor: string) {
    this.router.navigate(['/dashboard/proveedores/catalogo']);
  }

  public getProveedores(){
    this._proveedores.getProveedores().then((resp:any)=>{
      this.proveedores=resp;      
    }).catch(e=>{
      console.log(e.message);
    })
  }

  public openperfilproveedor(id_proveedor: string) {
    this.router.navigate(['/dashboard/proveedores/perfil',id_proveedor]);
  }
  public llamarproveedor(numero:string){
      window.location.href=`tel:${numero}`
  }
}
