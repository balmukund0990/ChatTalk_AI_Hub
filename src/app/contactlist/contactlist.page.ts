import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList,  IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { Contacts } from '@capacitor-community/contacts';


@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.page.html',
  styleUrls: ['./contactlist.page.scss'],
  standalone: true,
  imports: [IonList,  IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class ContactlistPage implements OnInit {
  contactList: any[] = [];

  constructor() { }

  async ngOnInit() {
    await this.loadContacts();
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

}
