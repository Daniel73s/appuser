import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {


  constructor(private router:Router,private loadingCtrl:LoadingController) { }
  private loading:any;
  ngOnInit() {
  }

  public login(){
    this.loading_component();
    setTimeout(() => {
      this.loading.dismiss();
      this.router.navigate(['/dashboard'])
    }, 2000); 
  }

  private async loading_component() {
    this.loading = await this.loadingCtrl.create({
      message: 'Autenticando',
      spinner:'dots'
    });
    await this.loading.present();
  }
}
