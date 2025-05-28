import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { AuthInterceptor } from './app/interceptor/auth.interceptor';



bootstrapApplication(AppComponent, {
  providers: [
    // Configuração do Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({ mode: 'md' }),
    
    // Roteamento
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // HTTP Client e Interceptors
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptor, 
      multi: true 
    },
    
    
    {
      provide: Storage,
      useFactory: () => new Storage()
    }
  ]
}).catch(err => console.error(err));