import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { FilmeService } from 'src/app/service/filme.service';

interface Filme {
  id_filme: number;
  nome: string;
  descricao: string;
  genero: string;
  nota: number;
  assistido: 'sim' | 'nao';
  estrelas: number;
}

@Component({
  selector: 'app-listar-filmes',
  templateUrl: './listar-filmes.page.html',
  styleUrls: ['./listar-filmes.page.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports:[NgIf, NgFor, FormsModule, IonicModule]
})
export class ListarFilmesPage {

  filmes: Filme[] = [];
  filmesFiltrados: Filme[] = [];
  termoPesquisa: string = '';
  carregando = true;
  erro: string | null = null;
  idUsuario!: number;
  

  constructor(
    private filmesService: FilmeService,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.obterIdUsuario();
  }
 
    ionViewWillEnter() {
    this.carregarFilmes();
  }

  /*async ngOnInit() {
     this.obterIdUsuario();
    if (this.idUsuario) {
    await this.carregarFilmes();
    }
  }*/

  async carregarFilmes() {
    this.carregando = true;
    this.erro = '';
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token não encontrado');
  
      const response = await lastValueFrom(
         this.filmesService.listarFilmesUsuario(this.idUsuario)
      );
      
      this.filmes = response as Filme[]; 
      this.filmesFiltrados = [...this.filmes];
      
    } catch (erro: unknown) {
      this.erro = erro instanceof Error ? erro.message : 'Erro desconhecido';
    } finally {
      this.carregando = false;
    }
  }
  
  async mostrarErro(mensagem: string | null) {
    const msg = mensagem || 'Erro desconhecido';
    
    const alert = await this.alertCtrl.create({
      header: 'Erro',
      message: msg,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });
  
    await alert.present();
  }
  

  getGeneroColor(genero: string): string {
    const colors: Record<string, string> = {
      'acao': 'danger',
      'drama': 'primary',
      'suspense': 'warning',
      'terror': 'dark',
      'romance': 'pink',
      'outros': 'medium'
    };
    return colors[genero.toLowerCase()] || 'medium';
  }

  voltarHome() {
    this.router.navigate(['/home']);
    }

    cadastrarfilme() {
      this.router.navigate(['/adicionar-filmes']);
      }

      filtrarFilmes() {
        if (!this.termoPesquisa) {
          this.filmesFiltrados = [...this.filmes];
          return;
        }
        
        const termo = this.termoPesquisa.toLowerCase();
        this.filmesFiltrados = this.filmes.filter(filme => 
          filme.nome.toLowerCase().includes(termo) ||
          (filme.descricao && filme.descricao.toLowerCase().includes(termo)) ||
          filme.genero.toLowerCase().includes(termo)
        );
      }
    
      editarFilme(filme: Filme) {
        this.router.navigate(['/editar-filme', filme.id_filme]);
        
      }

      async excluirFilme(filme: Filme) {
        const alert = await this.alertCtrl.create({
          header: 'Confirmar Exclusão',
          message: `Deseja realmente excluir o filme "${filme.nome}"?`,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Excluir',
              handler: async () => {
                try {
                  await this.filmesService.excluirFilme(filme.id_filme).toPromise();
                  this.carregarFilmes(); 
                } catch (erro) {
                  console.error('Erro ao excluir filme:', erro);
                  const alertErro = await this.alertCtrl.create({
                    header: 'Erro',
                    message: 'Não foi possível excluir o filme.',
                    buttons: ['OK']
                  });
                  await alertErro.present();
                }
              }
            }
          ]
        });
        await alert.present();
      }
      obterIdUsuario() {
        const usuario = localStorage.getItem('usuarioLogado');
        if (usuario) {
          try {
            const dadosUsuario = JSON.parse(usuario);
            this.idUsuario = Number(dadosUsuario.id_usuario) || 0;
      
            if (!this.idUsuario) {
              console.error('Erro: ID do usuário inválido.');
              this.router.navigate(['/home']);
            }
          } catch (error) {
            console.error('Erro ao processar JSON do usuário:', error);
            this.router.navigate(['/home']);
          }
        } else {
          console.error('Usuário não encontrado no localStorage.');
          this.router.navigate(['/home']);
        }
}
}