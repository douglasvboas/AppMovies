import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, firstValueFrom, lastValueFrom, map, Observable, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { StorageService } from '../providers/storage.provider';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlbase = environment.apiUrlLogin;
  private apiUrlCad = environment.apiUrlCadUsu;
  private http = inject(HttpClient);

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  cadastrarUsuario(usuario: any): Observable<any> {
    console.log('Cadastrando usuário:', usuario);
    return this.http.post(this.apiUrlCad, usuario).pipe(
      tap((response) => console.log('Resposta do servidor:', response)),
      catchError((error) => {
        console.error('Erro ao cadastrar usuário:', error);
        return throwError(error);
      })
    );
  }

  async login(credentials: { cpf: string, senha: string }) {
    return this.http.post<any>(this.apiUrlbase, credentials);
  }

  
  async logout() {
    await this.storageService.remove('token');
    await this.storageService.remove('nome');
    this.router.navigate(['/login']);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.storageService.get('token');
    return !!token;
  }
}