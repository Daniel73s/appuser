import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidosService } from 'src/app/services/pedidos.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.scss'],
})
export class PedidoDetalleComponent  implements OnInit {
  private id_pedido!:string;
  public pedido:any;
  constructor(private RoutedActivate:ActivatedRoute,private _pedido:PedidosService) { }

  ngOnInit() {
    this.id_pedido=this.RoutedActivate.snapshot.params['id'];
    this.getInfoPedido(this.id_pedido);
  }


  private getInfoPedido(id_pedido:string){
      this._pedido.getInformacionPedido(id_pedido).then((resp:any)=>{
        this.pedido=resp;
      }).catch((e:any)=>{
        console.log(e);
      })
  }

  public llamarProveedor(celular:string){
    window.location.href=`tel:${celular}`;
  }

}
