import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, 
  IonLabel,  IonButton, IonInput,  ModalController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-cadastromodal',
  templateUrl: './cadastromodal.page.html',
  styleUrls: ['./cadastromodal.page.scss'],
  standalone: true,
  imports: [ IonInput, IonButton, IonLabel, IonItem, 
    IonContent, IonHeader, IonTitle, IonToolbar,CommonModule, FormsModule
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class CadastroModalPage {
  usuario = {
    nome: '',
    cpf: '',
    email: '',
    senha: ''
  };

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  async cadastrar() {
    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando...'
    });
    await loading.present();
  
    try {
      const response: any = await this.authService.cadastrarUsuario(this.usuario).toPromise();
      
      if (response?.success) {
        await this.mostrarAlerta('Sucesso!', 'Cadastro realizado com sucesso');
        this.router.navigate(['/login']);
      } else {
        await this.mostrarAlerta('Erro', response?.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro completo:', error);
      await this.mostrarAlerta('Erro', 'Verifique sua conexão ou tente novamente mais tarde');
    } finally {
      await loading.dismiss();
    }
  } 

    private async mostrarAlerta(title: string, message: string) {
      const alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }
  
    private async showAlert(title: string, message: string) {
      const alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }
  }
