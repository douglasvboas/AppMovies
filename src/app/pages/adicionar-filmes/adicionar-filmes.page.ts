import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuButton, IonButtons, IonFooter,
  IonItem, IonInput, IonSelect, IonSelectOption, IonLabel, IonButton, IonIcon, IonList} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/service/auth.service';
import { FilmeService } from 'src/app/service/filme.service';


@Component({
  selector: 'app-adicionar-filmes',
  templateUrl: './adicionar-filmes.page.html',
  styleUrls: ['./adicionar-filmes.page.scss'],
  standalone: true,
  imports: [IonList, 
    IonFooter, IonButtons, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule,
    IonItem, IonInput, IonSelect, IonSelectOption, IonLabel, IonButton, IonIcon, IonMenu, IonMenuButton
  ]
})
export class AdicionarFilmesPage  {
  filmeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private filmeService: FilmeService,
    private alertController: AlertController,
    private authService: AuthService
  ) {
    this.filmeForm = this.formBuilder.group({
      nome:      ['', Validators.required],
      descricao: ['', Validators.required],
      genero:    ['', Validators.required],
      assistido: ['', Validators.required],
      nota:      ['', [Validators.required, Validators.min(0.0), Validators.max(10.0)]],
      estrelas:  [0, Validators.required],
      
     
    });
  }
  rate(stars: number) {
    this.filmeForm.patchValue({ estrelas: stars });
  }


  async salvarFilme() {
  if (this.filmeForm.valid) {
    try {
      // Obter ID do usuário corretamente
      const usuario = await this.authService.getUsuario();
      if (!usuario || !usuario.id_usuario) {
        throw new Error('Usuário não autenticado');
      }

      // Preparar dados do filme
      const filmeData = {
        ...this.filmeForm.value,
        id_usuario: usuario.id_usuario, // Número, não objeto
        assistido: this.filmeForm.value.assistido ? 'sim' : 'não'
      };

      console.log('Dados enviados:', filmeData); 

      this.filmeService.salvarFilme(filmeData).subscribe({
        next: async (response) => {
          if (response.success) {
            const alert = await this.alertController.create({
               header: 'Sucesso',
               message: 'Filme cadastrado com sucesso!',
               buttons: ['OK']
            });
                await alert.present();
                this.filmeForm.reset();

                this.filmeForm.patchValue({estrelas: 0});
          }
        },
        error: async (err) => {
          console.error('Erro completo:', err);
          await this.mostrarErro(err.error?.message || 'Erro desconhecido');
        }
      });
    } catch (error) {
      console.error('Erro ao obter usuário:', error);
      await this.mostrarErro('Faça login antes de cadastrar filmes');
    }
  }
}
async mostrarErro(mensagem: string) {
  const alert = await this.alertController.create({
    header: 'Erro',
    message: mensagem,
    buttons: ['OK']
  });
  await alert.present();
}
 

  async obterIdUsuario(): Promise<number> {
  const usuario = await this.authService.getUsuario(); 
  if (!usuario) {
    throw new Error('Usuário não autenticado!');
  }
  return usuario.id_usuario; 
}
  
}
