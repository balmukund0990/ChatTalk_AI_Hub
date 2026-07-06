import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList,  IonItem, IonLabel, IonAvatar, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle } from 'ionicons/icons';

@Component({
  selector: 'app-chat-status',
  templateUrl: './chat-status.page.html',
  styleUrls: ['./chat-status.page.scss'],
  standalone: true,
  imports: [IonList,  IonItem, IonLabel, IonAvatar, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton]
})
export class ChatStatusPage implements OnInit {
  public recentStatuses = [
    {
      name: 'John Doe',
      time: 'Just now',
      avatar: '../../assets/icon/avatarIcon1.png',
      totalUpdates: 1, // Full circle
      readUpdates: 0
    },
    {
      name: 'Jane Smith',
      time: 'Today, 10:15 AM',
      avatar: '../../assets/icon/avatarIcon2.png',
      totalUpdates: 3, // Segmented into 3 distinct parts
      readUpdates: 0
    },
    {
      name: 'Alex Rivera',
      time: 'Today, 8:43 AM',
      avatar: '../../assets/icon/avatarIcon.png',
      totalUpdates: 5, // Segmented into 5 distinct parts
      readUpdates: 0
    }
  ];
  constructor() { 
    addIcons({addCircle})
  }

  ngOnInit() {
  }

}
