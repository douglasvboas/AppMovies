import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports:[  FormsModule, CommonModule, IonicModule,
    ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
    template: `
    <ion-input [(ngModel)]="credentials.cpf" placeholder="CPF"></ion-input>
    <ion-input [(ngModel)]="credentials.senha" type="password" placeholder="Senha"></ion-input>
    <ion-button  (click)="login()" >Entrar</ion-button>
  `
})
export class LoginPage {
  credentials = {cpf: '', senha: ''};
  isLoading = false;
  errorMessage: any;
  
  constructor(
    //private authSe rvice = inject(AuthService);
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private authService: AuthService,
  ) {}
  
async login() {
  if (!this.credentials.cpf || !this.credentials.senha) {
    await this.showAlert('Erro', 'CPF e senha são obrigatórios!');
    return;
  }

  this.isLoading = true;
  const loading = await this.loadingCtrl.create({
    message: 'Autenticando...',
    duration: 1000
  });

  try {
    await loading.present();
    const success = await this.authService.login(this.credentials);
    
    if (success) {
      this.router.navigate(['/home']);
    } else {
      await this.showAlert('Erro', 'Credenciais inválidas');
    }
  } catch (error) {
    await this.showAlert('Erro', 'Falha na conexão com o servidor');
  } finally {
    this.isLoading = false;
    await loading.dismiss();
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

