import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RankingService {
  
  private apiUrlRank = environment.apiUrlRankFilm;  


  constructor(private http: HttpClient) {}

  getRankingFilmes(): Observable<any> {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return throwError(() => new Error('Token não encontrado'));
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    
    return this.http.get(`${this.apiUrlRank}`, { 
      headers
        }).pipe(
      map((response: any) => {
        if (!response?.success) {
          throw new Error(response?.message || 'Resposta inválida do servidor');
        }
        return response.data;
      }),
      catchError(error => {
        console.error('Erro no ranking:', error);
        
        let errorMsg = 'Erro ao carregar ranking';
        if (error.status === 0) {
          errorMsg = 'Erro de conexão. Verifique sua internet.';
        } else if (error.status === 401) {
          errorMsg = 'Sessão expirada. Faça login novamente.';
        } else if (error.error?.message) {
          errorMsg = error.error.message;
        }
        
        return throwError(() => new Error(errorMsg));
      })
    );
  }
}