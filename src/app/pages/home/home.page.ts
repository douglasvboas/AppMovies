import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/providers/storage.provider';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, AfterViewInit {
  nomeUsuario: string = 'Usuário';

  constructor(
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  async ngOnInit() {
    const usuario = await this.authService.getUsuario();
    this.nomeUsuario = usuario?.nome ?? 'Usuário';
  }

  async ionViewWillEnter() {
    const usuario = await this.authService.getUsuario();
    this.nomeUsuario = usuario?.nome ?? 'Usuário';
  }

  adicionarFilmes() {
    this.router.navigate(['/adicionar-filmes']);
  }

ngAfterViewInit() {
  setTimeout(() => {
    this.iniciarChuvaPipocas();
  }, 2000);
}

  explodirPipocas() {
    const container = document.getElementById('pipocas-container');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
      const pipoca = this.renderer.createElement('div');
      this.renderer.addClass(pipoca, 'pipoca');

      const x = `${Math.random() * 200 - 100}px`;
      const y = `${Math.random() * 400 - 150}px`;

      this.renderer.setStyle(pipoca, '--x', x);
      this.renderer.setStyle(pipoca, '--y', y);
      this.renderer.setStyle(pipoca, 'top', `${Math.random() * 200 + 50}px`);
      this.renderer.setStyle(pipoca, 'left', `${Math.random() * 100}%`);

      container.appendChild(pipoca);

      // Remover após animação
      setTimeout(() => this.renderer.removeChild(container, pipoca), 3000);
    }
  }
  iniciarChuvaPipocas() {
  const container = document.getElementById('pipocas-container');
  if (!container) return;

  setInterval(() => {
    const pipoca = this.renderer.createElement('div');
    this.renderer.addClass(pipoca, 'pipoca');

    const size = 20 + Math.random() * 30; // 20px a 50px
    const left = Math.random() * 100; // porcentagem da tela
    const delay = Math.random() * 2; // animação em tempos diferentes

    this.renderer.setStyle(pipoca, 'left', `${left}%`);
    this.renderer.setStyle(pipoca, 'width', `${size}px`);
    this.renderer.setStyle(pipoca, 'height', `${size}px`);
    this.renderer.setStyle(pipoca, 'animation-delay', `${delay}s`);

    container.appendChild(pipoca);

    // Remove pipoca após animação
    setTimeout(() => this.renderer.removeChild(container, pipoca), 6000);
  }, 150); // nova pipoca a cada 150ms
}
}
