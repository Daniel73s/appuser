import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProveedoresService } from '../../services/proveedores.service';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-perfil-proveedor',
  templateUrl: './perfil-proveedor.component.html',
  styleUrls: ['./perfil-proveedor.component.scss'],
})
export class PerfilProveedorComponent {
  private id: string = '';
  public proveedor: any;
  constructor(private routerActivate: ActivatedRoute,
    private _proveedores: ProveedoresService,
    private router: Router) { }

  ionViewWillEnter() {
    this.id = this.routerActivate.snapshot.params['id'];
    this.getProveedor(this.id);
  }

  private getProveedor(id: string) {
    this._proveedores.getProveedor(id).then((resp:any)=>{
          this.proveedor=resp;
          console.log(resp);
          
    });
  }

  @ViewChild(IonModal) modal!: IonModal;

  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name!: string;

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  public llamar(numero: string) {
    window.location.href = `tel:${numero}`;
  }

  public catalogo(id: string) {
    this.router.navigate(['/dashboard/proveedores/catalogo', id]);
  }
}
