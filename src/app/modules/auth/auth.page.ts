import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  public formlogin!: FormGroup;
  constructor(private router: Router,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private _auth: AuthService,
    private toastCtrl: ToastController,
    private _storage: StorageService) { }
    private loading: any;
    public user:any
  ngOnInit() {
    this.formInit();
  }
  private formInit() {
    this.formlogin = this.fb.group({
      usuario: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    })
  }

  public login() {
    if (this.formlogin.valid) {
      this.loading_component();
      const { usuario, pass } = this.formlogin.getRawValue();
      this._auth.login(usuario, pass).then((resp: any) => {
        this._storage.guardarToken(resp.token);
        this._storage.setDataUser(resp.token);
        if(resp.rol=='COLEGIO'){
          this.router.navigate(['/dashboard/menu']);
        }else{
          this.router.navigate(['/dashboard/productos',resp.id]);
        }
        this.mensaje('Inicio sesion correctamente', 'success', 3000);
      }).catch((e: any) => {
        this.mensaje(e.error.mensaje, 'danger', 3000);
      }).finally(() => {
        this.loading.dismiss();
      })
    }
  }

  private async loading_component() {
    this.loading = await this.loadingCtrl.create({
      message: 'Autenticando',
      spinner: 'dots'
    });
    await this.loading.present();
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


}
