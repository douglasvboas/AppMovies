import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from '../../../environments/environment';
import { IonHeader, IonButton } from "@ionic/angular/standalone";
import { StorageService } from 'src/app/providers/storage.provider';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports:[  FormsModule,
    ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
    template: `
    <ion-input [(ngModel)]="credentials.cpf" placeholder="CPF"></ion-input>
    <ion-input [(ngModel)]="credentials.senha" type="password" placeholder="Senha"></ion-input>
    <ion-button (click)="login()">Entrar</ion-button>
  `
})
export class LoginPage {
  credentials = {cpf: '', senha: ''};
  private authService = inject(AuthService);
  isLoading = false;
  errorMessage: any;

  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}
  

async login() {
  console.log('vamos logar!')
    if (!this.credentials.cpf || !this.credentials.senha) {
      console.error('CPF e senha são obrigatórios!');
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';

  const loading = await this.loadingCtrl.create({
    message: 'Autenticando...',
    duration: 5000
  });

  try {
     const response = await firstValueFrom(await this.authService.login(this.credentials));
    await loading.present();

    console.log('Iniciando o login com as credenciais:', this.credentials); 

    const success = await this.authService.login(this.credentials);
    
    console.log('Login bem-sucedido?', success); 
    await this.router.navigate(['/home']);

    if (!success) {
      await this.showAlert('Erro', 'Verifique suas credenciais');
    } else {
      console.log('Redirecionando para a Home...');
    }
  } catch (error: any) {
    const errorMessage = error?.message || 'Erro desconhecido';
    console.error('Erro no login:', errorMessage);  
    await this.showAlert('Falha', errorMessage);
  } finally {
    this.isLoading = false;
  }
}
  private async showAlert(title: string, message: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  recuperarSenha(){
    this.router.navigate(['/cadastromodal']);
  }
}

