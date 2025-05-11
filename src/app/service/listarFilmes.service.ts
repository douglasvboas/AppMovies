import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


export interface Filme {
  id_filme: number;
  id_usuario?: number;  
  nome: string;
  descricao: string;
  genero: string;
  nota: number;
  assistido: 'sim' | 'nao';  
  estrelas: number;
}

@Injectable({
  providedIn: 'root'
})
export class ListarFilmesService {
 
    private apiUrlApi = environment.apiUrlbase;  
    private apiUrlList = environment.apiUrlListFilm;  
    private apiUrlDel = environment.apiUrlDelete;  


  constructor(private http: HttpClient) {}

 

  listarFilmes(id_usuario: number): Observable<any> {
    return this.http.get(`${this.apiUrlApi}/listar-filmes.php?id_usuario=${id_usuario}`);
  }
  
  listarFilmesUsuario(): Observable<Filme[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.get<Filme[]>(
      `${this.apiUrlApi}/listar-filmes.php`,
      { headers, withCredentials: false }
    ).pipe(
      catchError(error => {
        console.error('Erro CORS:', error);
        return throwError(() => new Error('Erro na requisição'));
      })
    );
  }

  getFilmeById(id: number): Observable<Filme> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.get<any>(`${this.apiUrlList}/${id}`, { headers }).pipe(
      map(response => {
        const data = response.data || response;
        
        return {
          id_filme: data.id_filme,
          id_usuario: data.id_usuario || null, 
          nome: data.nome,
          descricao: data.descricao,
          genero: data.genero,
          nota: data.nota,
          assistido: data.assistido,
          estrelas: data.estrelas
        } as Filme;
      })
    );
  }
  
  atualizarFilme(filme: any): Observable<any> {
    return this.http.post(`${this.apiUrlApi}/editar-filme.php`, filme);
  }


  excluirFilme(id_filme: number): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    return this.http.post(
      `${this.apiUrlApi}/excluir-filme.php`,
      { id_filme },
      { headers }
    );
  }

}

