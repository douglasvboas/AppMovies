import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Filme } from '../interfaces/filme.interface';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  private apiUrlBase = environment.apiUrlbase; 
  private apiUrlApi = environment.apiUrlbase; 
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

 listarFilmes(): Observable<Filme[]> {
   const headers = this.getAuthHeaders();
  return this.http.get<Filme[]>(`${this.apiUrlApi}/listar-filmes.php`, { headers });
 
}


  getFilmeById(id_filme: number): Observable<Filme> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrlBase}/listar-filmes.php?id_filme=${id_filme}`, { headers }).pipe(
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
      }),
      catchError(error => {
        console.error('Erro ao obter filme:', error);
        return throwError(() => new Error('Erro ao obter filme'));
      })
    );
  }

  salvarFilme(filme: Filme): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrlBase}/cadastrar-filme.php`, filme, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao salvar filme:', error);
        return of({ success: false, message: 'Erro ao salvar filme' });
      })
    );
  }

  atualizarFilme(filme: Filme): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrlBase}/editar-filme.php`, filme, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao atualizar filme:', error);
        return throwError(() => new Error('Erro ao atualizar filme'));
      })
    );
  }

  excluirFilme(id_filme: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(`${this.apiUrlBase}/excluir-filme.php`, { id_filme }, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao excluir filme:', error);
        return throwError(() => new Error('Erro ao excluir filme'));
      })
    );
  }

  listarFilmesUsuario(id_usuario: number): Observable<Filme[]> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<any>(
    `${this.apiUrlBase}/listar-filmes.php?id_usuario=${id_usuario}`,
    { headers }
  ).pipe(
    map(response => response.data || []),  
    catchError(error => {
      console.error('Erro ao listar filmes:', error);
      return throwError(() => new Error('Erro na requisição'));
    })
  );
}

  editarFilme(filme: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrlBase}/editar-filme.php`, filme);
  }


     /* listarFilmesUsuario(id_usuario: number): Observable<Filme[]> {
  const token = localStorage.getItem('token');
  console.log('Token usado:', token); 
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.get<Filme[]>(
    `${this.apiUrlBase}/listar-filmes.php?id_usuario=${id_usuario}`,
    { headers, withCredentials: false }
  ).pipe(
    catchError(error => {
      console.error('Erro ao listar filmes:', error);
      return throwError(() => new Error('Erro na requisição'));
    })
  );
}*/

}
