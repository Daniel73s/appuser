import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../proveedores/services/proveedores.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';

@Component({
  selector: 'app-reportes-proveedor',
  templateUrl: './reportes-proveedor.page.html',
  styleUrls: ['./reportes-proveedor.page.scss'],
})
export class ReportesProveedorPage {
  private id_proveedor!: string;
  public mes_anio!: Date;
  public estado_pedido = 'entregado';
  private proveedor:any;
  constructor(private ActivatedRoute: ActivatedRoute,
    private _proveedores: ProveedoresService,
    private _reportes: ReportesService,
    private _pdfGenerator: PdfGeneratorService) { }

  ionViewWillEnter() {
    this.id_proveedor = this.ActivatedRoute.snapshot.params['id'];
    this.getInfoProveedor(this.id_proveedor);
  }

  private getInfoProveedor(id_proveedor: string) {
    this._proveedores.getProveedor(id_proveedor).then((resp: any) => {
      console.log(resp);
      this.proveedor=resp;
    }).catch((e: any) => {
      console.log(e);
    })
  }

  public reporte_mes() {
    const anio = new Date(this.mes_anio).getFullYear();
    const mes = new Date(this.mes_anio).getMonth() + 1;
    this._reportes.getPedidosProveedorByMes(this.id_proveedor, anio, mes, this.estado_pedido)
      .then((resp: any) => {
        this._pdfGenerator.pedidosProveedorMesPDF(resp,this.proveedor);
      }).catch(e => {
        console.log(e);
      })
  }



}
