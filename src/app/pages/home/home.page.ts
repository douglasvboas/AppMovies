import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { StorageService } from 'src/app/providers/storage.provider';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  nomeUsuario: string = '';
  

  constructor(
   private router :  Router,
   private storageService: StorageService,
   private authService: AuthService
  
  ) {}

async ngOnInit() {
  try {
    this.nomeUsuario = await this.storageService.get('nome') ?? 'Usuário';
    console.log('Nome carregado na Home:', this.nomeUsuario);
  } catch (error) {
    console.error('Erro ao recuperar nome:', error);
    this.nomeUsuario = 'Usuário';
  }
}
 async ionViewWillEnter() {
    const usuario = await this.authService.getUsuario();
    this.nomeUsuario = usuario?.nome ?? 'Usuário';
  }

  
  async carregarUsuario() {
    this.nomeUsuario = await this.storageService['get']('nome') ?? localStorage.getItem('nomeUsuario');
  }

  adicionarFilmes(){
    this.router.navigate(['/adicionar-filmes']);
  }
}