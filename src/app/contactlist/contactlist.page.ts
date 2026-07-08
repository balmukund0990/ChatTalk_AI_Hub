import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Contacts } from '@capacitor-community/contacts';
import { Database } from '../services/database';
import { LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class ContactlistPage implements OnInit {
  contactList: any[] = [];
  users: any[] = [];
  submittedValue = {};

  constructor(public dbService: Database, public loadingCtrl: LoadingController) { }

  async ngOnInit() {
    await this.loadContacts();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading secure data...',
      duration: 2000, // Optional fallback timeout auto-dismisses after 5s
      spinner: 'bubbles',
    });

    // Display the spinner overlay
    await loading.present();

    // Simulating an asynchronous HTTP operation
    setTimeout(async () => {
      // Dismiss the spinner overlay programmatically
      await loading.dismiss();
    }, 2400);
  }

  async loadContacts() {
    try {
      // 1. Request runtime permissions from the user
      const permission = await Contacts.requestPermissions();

      if (permission.contacts === 'granted') {
        // 2. Fetch the contact list
        const result = await Contacts.getContacts({
          projection: {
            name: true,
            phones: true,
            emails: true
          }
        });

        this.contactList = result.contacts;
        console.log('Fetched contacts successfully:', this.contactList);
        this.showLoading();
      } else {
        console.warn('Permission to access contacts was denied.');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }
  async getCurrentLData(contact: any) {
    this.submittedValue = {
      name: contact.name.display,
      category: contact.phones[0].number
    };
    this.addUser(this.submittedValue);
  }

  async addUser(data: any) {
    console.log('Loading added user contact');
    const sql = `INSERT INTO users (name, category) VALUES (?, ?);`;
    await this.dbService.executeQuery(sql, [data.name, data.category]);
    await this.loadUsers(); // Refresh UI array
  }

  async loadUsers() {
    console.log('loading user data..');
    const sql = `SELECT * FROM users;`;
    this.users = await this.dbService.selectQuery(sql);
    console.log('Load user data--- ', this.users);
  }

}
