import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonContent, IonSearchbar, IonItem, IonLabel, IonList, IonAvatar, IonNote, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { arrowDownOutline, camera, chatbox, chevronDown } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Camera } from '@capacitor/camera';
import { Database } from '../services/database';
import { DataService } from '../services/data-service';

interface Item {
  id: number,
  name: string,
  category: string
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, CommonModule, IonSearchbar, IonItem, IonLabel, IonList, IonAvatar, IonNote, IonRefresher, IonRefresherContent]
})
export class Tab1Page implements OnInit {
  searchQuery = '';
  imageElement: any;
  users: Item[] = [
    { id: 1, name: 'chat user name', category: '+91 0000000000' }
  ];
  public filteredItems: Item[] = [];
  private dataService = inject(DataService);

  constructor(public router: Router, public dbService: Database) {
    addIcons({ camera, chatbox, arrowDownOutline });
  }
  ngOnInit(): void {
    this.filteredItems = [...this.users];
    this.loadUserListDB();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.loadUserListDB();
  }

  async handleRefresh(event: any) {
    console.log('User pulled down to refresh');

    try {
      // Simulating a backend API call delay (e.g., 2 seconds)
      await this.loadUserListDB();
    } catch (error) {
      console.error('Failed loading history data', error);
    } finally {
      // CRITICAL: Tells the refresher animation component to complete and close!
      event.target.complete();
    }
  }

  async loadUserListDB() {
    console.log('loading DB Data..');
    const sql = `SELECT * FROM users;`;
    this.users = await this.dbService.selectQuery(sql);
    console.log('Load user data--- ', this.users);
    this.filteredItems = [...this.users];
  }

  handleSearch(event: any) {
    console.log('Search query:', event);
    const query = event.target.value?.toLowerCase() || '';
    if (!query.trim()) {
      this.filteredItems = [...this.users];
      return;
    }
    this.filteredItems = this.users.filter(item => {
      return item.name.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);
    });
  }

  async getCameraPic() {
    console.log('Button clicked');
    try {
      const result = await Camera.takePhoto({
        quality: 90,
        includeMetadata: true,
      });

      console.log(result);
    } catch (e) {
      console.error(e);
    }
  }

  getSeptChatData(chatData: any) {
    console.log('Seprate chat data entry..');
    this.router.navigate(['/pvt-chat-data']);
    this.dataService.setSelectedItem(chatData);

  }

  goToContactList() {
    console.log('goToContactList');
    this.router.navigate(['/contactlist']);
  }
}
