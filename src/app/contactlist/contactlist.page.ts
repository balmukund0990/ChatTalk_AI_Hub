import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Contacts } from '@capacitor-community/contacts';
import { Database } from '../services/database';
import { AlertController } from '@ionic/angular';

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
  submittedValue: string = '';

  constructor(public dbService: Database, private alertController: AlertController) { }

  async ngOnInit() {
    await this.loadContacts();
    await this.addUser();
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
      } else {
        console.warn('Permission to access contacts was denied.');
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  }
  async getCurrentLData(event:any) {
    const alert = await this.alertController.create({
      header: 'Enter Information',
      inputs: [
        {
          name: 'userInput',
          type: 'text',
          label:'Name',
          placeholder: 'Type something here...',
        },
        {
          name: 'userInput',
          type: 'text',
          placeholder: 'Type something here...',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: (data) => {
            // "data.userInput" matches the "name" property in the inputs array
            this.submittedValue = data.userInput;
          },
        },
      ],
    });

    await alert.present();
  }

  async addUser() {
    console.log('Loading added user contact');
    const sql = `INSERT INTO users (name, email) VALUES (?, ?);`;
    await this.dbService.executeQuery(sql, ['John Doe', 'john@example.com']);
    await this.loadUsers(); // Refresh UI array
  }

  async loadUsers() {
    console.log('loading user data..');
    const sql = `SELECT * FROM users;`;
    this.users = await this.dbService.selectQuery(sql);
    console.log('Load user data--- ', this.users);
  }

}
