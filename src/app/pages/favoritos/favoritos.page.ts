import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenu,IonMenuButton, IonButtons, IonFooter, IonSearchbar } from '@ionic/angular/standalone';
import { RankingService } from 'src/app/service/ranking.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonTitle, IonToolbar, IonHeader, IonTitle,
    CommonModule, FormsModule],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FavoritosPage {
  filmesRanking: any[] = [];
  carregando = true;

  constructor(
    private rankingService: RankingService,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.carregarRanking();
  }

  carregarRanking() {
    this.carregando = true;
    this.rankingService.getRankingFilmes().subscribe({
      next: (filmes: any[]) => {
        this.filmesRanking = filmes;
        this.carregando = false;
      },
      error: async (err: { message: string; }) => {
        this.carregando = false;
        const alert = await this.alertCtrl.create({
          header: 'Erro',
          message: 'Falha ao carregar ranking: ' + err.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

  getCorEstrelas(quantidade: number): string {
    if (quantidade >= 4) return 'success';
    if (quantidade >= 2) return 'warning';
    return 'danger';
  }
}