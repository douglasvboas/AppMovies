import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Filme } from './listarFilmes.service';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  
  private apiUrlCad = environment.apiUrlCadFilm;  
  private apiUrlList = environment.apiUrlListFilm;  

  constructor(private http: HttpClient) {} 

  salvarFilme(filme: Filme): Observable<any> {
      const headers = new HttpHeaders({
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });
    const apiUrlFilm = `${this.apiUrlCad.replace(/\/+$/, '')}`;
    console.log(filme);  
    return this.http.post<any>(this.apiUrlCad, filme).pipe(
      catchError(error => {
        console.error('Erro ao salvar filme:', error);
        return of({ success: false, message: 'Erro ao salvar filme' });
      })
    );
  }


  getFilmes(id_usuario: number) {
    return this.http.get(`${this.apiUrlCad}?id_usuario=${id_usuario}`);
  }

  listarFilmes(id_usuario: number) {
    return this.http.post<any[]>(`${this.apiUrlList}`, { id_usuario });
  }

  
}

