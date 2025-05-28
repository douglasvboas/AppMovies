import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonButton, IonIcon, IonList, IonItem, IonInput, 
  IonTextarea, IonSelect, IonSelectOption, IonRange, IonBadge } from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmeService } from 'src/app/service/filme.service';
import { Filme } from 'src/app/interfaces/filme.interface';


@Component({
  selector: 'app-editar-filme',
  templateUrl: './editar-filme.page.html',
  styleUrls: ['./editar-filme.page.scss'],
  standalone: true,
 imports: [
  IonicModule, CommonModule, FormsModule
]})

export class EditarFilmePage  {

  filme: Filme = {
    id_filme: 0,
    nome: '',
    descricao: '',
    genero: '',
    nota: 0,
    assistido: 'nao',
    estrelas: 0
  };
  alertCtrl: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private filmesService: FilmeService
  ) {}

  ionViewWillEnter() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.carregarFilme(parseInt(id));
    }
  }

  async carregarFilme(id: number) {
    try {
      const filme = await this.filmesService.getFilmeById(id).toPromise();
      if (filme) {
        this.filme = filme;
      }
    } catch (error) {
      console.error('Erro ao carregar filme:', error);
    }
  }
  salvarEdicao() {
    if (!this.filme.nome || !this.filme.genero) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }
    this.filmesService.atualizarFilme(this.filme).subscribe(
      () => this.router.navigate(['/listar-filmes']),
      (erro: { message: string; }) => alert('Erro ao atualizar filme: ' + erro.message)
    );
  }
  


}
