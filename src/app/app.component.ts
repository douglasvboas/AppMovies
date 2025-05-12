import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, addCircleOutline, filmOutline, personAddOutline, starHalfOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle,
     IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Adicionar Filmes', url: '/adicionar-filmes', icon: 'paper-plane-outline' },
    { title: 'Listar Filmes', url: '/listar-filmes', icon: 'list-circle' },
    { title: 'Favoritos', url: '/favoritos', icon: 'star' },
    { title: 'Adicionar Usuario ', url: '/cadastromodal', icon: 'add' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private storage: Storage) {
     this.initStorage();
    addIcons({ 'home': homeOutline, 'add-circle': addCircleOutline, 'list-circle': filmOutline,
      'add': personAddOutline, 'star': starHalfOutline });
  }
    async initStorage() {
    await this.storage.create();
  }
}
