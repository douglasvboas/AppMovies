// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, firstValueFrom, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrlCad = environment.apiUrlCadUsu;
  private apiUrlbase = environment.apiUrlLogin;
  private storageKey = 'authData';

  constructor(
    private http: HttpClient,
    private router: Router,
    private storage: Storage
  ) {}

  async login(credentials: { cpf: string, senha: string }) {
    try {
      const response: any = await firstValueFrom(
        this.http.post(this.apiUrlbase, credentials)
      );

      if (response && response.token && response.usuario) {
        // Armazena todos os dados de autenticação
        await this.storage.set(this.storageKey, {
          token: response.token,
          usuario: response.usuario
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async getUsuario() {
    const authData = await this.storage.get(this.storageKey);
    return authData?.usuario;
  }

  async getToken() {
    const authData = await this.storage.get(this.storageKey);
    return authData?.token;
  }

  async logout() {
    await this.storage.remove(this.storageKey);
    this.router.navigate(['/login']);
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

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
  
}