import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ColegiosService } from 'src/app/services/colegios.service';
import { PdfGeneratorService } from 'src/app/services/pdf-generator.service';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-reportes-colegio',
  templateUrl: './reportes-colegio.page.html',
  styleUrls: ['./reportes-colegio.page.scss'],
})
export class ReportesColegioPage {
  private id_colegio!: string;
  public estado_pedido:string='confrimado';
  public date!: Date;
  private colegio: any;
  constructor(private ActivatedRoute: ActivatedRoute,
    private _colegios: ColegiosService,
    private _reportes: ReportesService,
    private toastCtrl: ToastController,
    private _generatepdf: PdfGeneratorService) { }

  ionViewWillEnter() {
    this.id_colegio = this.ActivatedRoute.snapshot.params['id_colegio'];
    this.getInfo(this.id_colegio);
  }

  private getInfo(id_colegio: string) {
    this._colegios.getColegioById(id_colegio).then((resp: any) => {
      this.colegio = resp;
    }).catch(e => {
      console.log(e);
    })
  }


  public generarMenu() {
    const anio = new Date(this.date).getFullYear();
    const mes = new Date(this.date).getMonth() + 1;
   
    this._reportes.getPedidosColegioByMes(this.id_colegio, anio, mes,'confirmado').then((resp: any) => {
      if (resp.length <= 0) {
        this.mensaje('no se encontro ningun registro', 'danger', 3000);
        return
      }
      // this._generatepdf.pedidosColegioMesPDF(resp, this.colegio, this.getMonthName(mes));
      this._generatepdf.generarMenuMensual(resp, mes,anio,this.colegio);
    }).catch(e => {
      console.log(e);

    })
  }


  async mensaje(message: string, color: string, duration: number) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      color,
      position: 'top'
    });
    toast.present();
  }

  public generarPanilla(){
    const date = new Date(this.date);
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    if (this.id_colegio && this.date) {
      this._reportes.getPedidosColegioByMes(this.id_colegio, anio, mes,this.estado_pedido).then((resp: any) => {
        this.generate_PDF_colegio(resp);
      }).catch(e => {
        console.log(e);
      })
    }else{
      console.log('faltan campos');      
    }
  }

  public generate_PDF_colegio(data:[]){
    const date = new Date(this.date);
    const mes = date.getMonth() + 1;
      this._generatepdf.generar_PDF_Colegio(data,this.colegio,this.getMonthName(mes))
  }
  private getMonthName(monthIndex: number): string {
    const months = [
      'Enero',    // 1
      'Febrero',  // 2
      'Marzo',    // 3
      'Abril',    // 4
      'Mayo',     // 5
      'Junio',    // 6
      'Julio',    // 7
      'Agosto',   // 8
      'Septiembre', // 9
      'Octubre',  // 10
      'Noviembre', // 11
      'Diciembre' // 12
    ];
    return months[monthIndex - 1]; // Ajusta el índice para que coincida con el 1 basado
  }

}
