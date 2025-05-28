
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, homeOutline, addCircleOutline, createOutline, starOutline, logInOutline, listOutline, accessibilitySharp, addCircleSharp, createSharp, starSharp, homeSharp, listSharp, personAddSharp } from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [RouterLink, RouterLinkActive, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    //{ title: 'login', url: '/login', icon: 'accessibility' },
    { title: 'Adicionar Filmes', url: '/adicionar-filmes', icon: 'add-circle' },
    { title: 'Listar Filmes', url: '/listar-filmes', icon: 'list' },
    //{ title: 'Editar Filmes', url: '/editar-filme', icon: 'create' },
    //{ title: 'Cadastro User', url: '/cadastromodal', icon: 'person-add' },
    { title: 'Favoritos', url: '/favoritos', icon: 'star' },
  ];
  public labels = [];
  platform: any;
  statusBar: any;
  
  constructor( ) {
   
    addIcons({ accessibilitySharp, addCircleSharp, createSharp, starSharp, homeSharp, listSharp, personAddSharp });
  }
  initializeApp() {
  console.log('App initialized!'); 
  this.platform.ready().then(() => {
    this.statusBar.styleDefault();
  });
}
 
}
