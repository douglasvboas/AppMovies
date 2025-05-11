import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { StorageService } from 'src/app/providers/storage.provider';


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
  nome: string = '';

  constructor(
   private router :  Router,
   private storageService: StorageService
  
  ) {}

  async ngOnInit() {
     this.nome = await this.storageService.get('nome');
    try {
      const nome = await this.storageService['get']('nome');
      this.nomeUsuario = nome || 'Usuário';
    } catch (error) {
      console.error('Erro ao recuperar nome:', error);
      this.nomeUsuario = 'Usuário';
    }
  }
  
  async carregarUsuario() {
    this.nomeUsuario = await this.storageService['get']('nome') || localStorage.getItem('nomeUsuario');
  console.log('chegou aqui...carregarUsuario')
  }

  adicionarFilmes(){
    this.router.navigate(['/adicionar-filmes']);
  }
}