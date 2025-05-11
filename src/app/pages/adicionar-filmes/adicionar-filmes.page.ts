
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { IonHeader, IonTitle, IonToolbar, IonMenu, IonMenuButton, IonButtons, IonFooter,
  IonItem, IonInput, IonSelect, IonSelectOption, IonLabel, IonButton, IonIcon, IonList} from '@ionic/angular/standalone';
import { FilmeService } from '../../service/filmeservice.service'; 
import { AlertController } from '@ionic/angular';


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
    private alertController: AlertController
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
      const filme = this.filmeForm.value;
      
     
      filme.id_usuario = this.obterIdUsuario();
      
      delete filme.id_filme;
  
      this.filmeService.salvarFilme(filme).subscribe(
        async (response: any) => {
          if (response.success) {
            const id_usuario = this.obterIdUsuario();  
              filme.id_usuario = id_usuario;
            const alert = await this.alertController.create({
              header: 'Sucesso',
              message: 'Filme salvo com sucesso!',
              buttons: ['OK']
            });
            await alert.present();
            this.filmeForm.reset();
          } else {
            const alert = await this.alertController.create({
              header: 'Erro',
              message: response.message || 'Erro ao salvar o filme.',
              buttons: ['OK']
            });
            await alert.present();
          }
        },
        async (error: any) => {
          const alert = await this.alertController.create({
            header: 'Erro',
            message: 'Ocorreu um erro ao salvar o filme.',
            buttons: ['OK']
          });
          await alert.present();
        }
      );
    } else {
      const alert = await this.alertController.create({
        header: 'Formulário Inválido',
        message: 'Por favor, preencha todos os campos corretamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  obterIdUsuario(): number {
    const idUsuario = localStorage.getItem('idUsuario'); 
    return idUsuario ? parseInt(idUsuario) : 1;  
  }
  
}