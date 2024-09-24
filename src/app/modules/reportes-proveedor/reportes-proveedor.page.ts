import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../proveedores/services/proveedores.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reportes-proveedor',
  templateUrl: './reportes-proveedor.page.html',
  styleUrls: ['./reportes-proveedor.page.scss'],
})
export class ReportesProveedorPage {
  private id_proveedor!: string;
  public mes_anio!: Date;
  public fecha_reporte!:Date;
  public estado_pedido = 'entregado';
  public estado_pedido_fecha = 'entregado';
  private proveedor: any;
  constructor(private ActivatedRoute: ActivatedRoute,
    private _proveedores: ProveedoresService,
    private _reportes: ReportesService,
    private _pdfGenerator: PdfGeneratorService,
    private toastCtrl: ToastController) { }

  ionViewWillEnter() {
    this.id_proveedor = this.ActivatedRoute.snapshot.params['id'];
    this.getInfoProveedor(this.id_proveedor);
  }

  private getInfoProveedor(id_proveedor: string) {
    this._proveedores.getProveedor(id_proveedor).then((resp: any) => {
      console.log(resp);
      this.proveedor = resp;
    }).catch((e: any) => {
      console.log(e);
    })
  }

  public reporte_mes() {
    const anio = new Date(this.mes_anio).getFullYear();
    const mes = new Date(this.mes_anio).getMonth() + 1;
    this._reportes.getPedidosProveedorByMes(this.id_proveedor, anio, mes, this.estado_pedido)
      .then((resp: any) => {
        if (resp.length <= 0) {
          this.mesaje('No se encontro ningun registro ', 'danger', 3000);
          return
        }
        this._pdfGenerator.generar_PDF_Proveedor(resp, this.proveedor, this.getMonthName(mes),'');
      }).catch(e => {
        console.log(e);
      })
  }

  public listamespasado(){
    const anio = new Date().getFullYear();
    let mes = new Date().getMonth();
    if(mes==0){
      mes=1
    }
    this._reportes.getPedidosProveedorByMes(this.id_proveedor, anio, mes,'entregado')
      .then((resp: any) => {
        if (resp.length <= 0) {
          this.mesaje('No se encontro ningun registro ', 'danger', 3000);
          return
        }
        this._pdfGenerator.generar_PDF_Proveedor(resp, this.proveedor, this.getMonthName(mes),'');
      }).catch(e => {
        console.log(e);
      })
  }

  private getMonthName(NumeroMes: number) {
    const months = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    if (NumeroMes < 1 || NumeroMes > 12) {
      throw new Error('El número del mes debe estar entre 1 y 12.');
    }

    return months[NumeroMes - 1];
  }

  async mesaje(message: string, color: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top'
    });
    toast.present();
  }

  public reporte_fecha() {
    const date=this.fecha_reporte.toLocaleString();
    console.log('generar reporte por fecha',date.slice(0,10),this.proveedor,this.estado_pedido_fecha);
    this._reportes.getPedidosProveedorByDate(this.id_proveedor, date.slice(0,10), this.estado_pedido_fecha)
      .then((resp: any) => {
        if (resp.length <= 0) {
          this.mesaje('No se encontro ningun registro ', 'danger', 3000);
          return
        }
        this._pdfGenerator.generar_PDF_Proveedor(resp, this.proveedor, date.slice(0,10),'');
      }).catch(e => {
        console.log(e);
      })
  }

}
