import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonSearchbar, IonItem, IonLabel, IonList, IonAvatar, IonNote } from '@ionic/angular/standalone';
import { camera, chatbox } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface Item {
  id: number,
  name: string,
  category: string
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule, IonSearchbar, IonItem, IonLabel, IonList, IonAvatar, IonNote]
})
export class Tab1Page implements OnInit {
  searchQuery = '';
  public items: Item[] = [
    { id: 1, name: 'Apple', category: 'Fruit' },
    { id: 2, name: 'Banana', category: 'Fruit' },
    { id: 3, name: 'Carrot', category: 'Vegetable' },
    { id: 4, name: 'Donut', category: 'Pastry' }
  ];
  public filteredItems: Item[] = [];

  constructor(public router : Router) {
    addIcons({ camera, chatbox });
  }
  ngOnInit(): void {
    this.filteredItems = [...this.items];
  }

  handleSearch(event: any) {
    console.log('Search query:', event);
    const query = event.target.value?.toLowerCase() || '';
    // If query is empty, show everything
    if (!query.trim()) {
      this.filteredItems = [...this.items];
      return;
    }
    this.filteredItems = this.items.filter(item => {
      return item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
    });
  }

  goToContactList(){
    console.log('goToContactList');
    this.router.navigate(['/contactlist']);
  }
}
