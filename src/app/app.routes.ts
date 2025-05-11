import { Routes } from '@angular/router';
import { AuthService } from './service/auth.service';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
  },
  {
    path: 'adicionar-filmes',
    loadComponent: () => import('./pages/adicionar-filmes/adicionar-filmes.page').then( m => m.AdicionarFilmesPage)
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./pages/favoritos/favoritos.page').then( m => m.FavoritosPage)
  },
  {
    path: 'listar-filmes',
    loadComponent: () => import('./pages/listar-filmes/listar-filmes.page').then( m => m.ListarFilmesPage)
  },
  {
    path: 'cadastromodal',
    loadComponent: () => import('./pages/cadastromodal/cadastromodal.page').then( m => m.CadastroModalPage)
  },
  {
    path: 'editar-filme/:id',
    loadComponent: () => import('./pages/editar-filme/editar-filme.page').then( m => m.EditarFilmePage)
  },

 

];
