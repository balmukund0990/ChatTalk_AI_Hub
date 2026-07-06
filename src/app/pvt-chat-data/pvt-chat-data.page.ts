import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonIcon, IonContent, IonTextarea, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonAvatar, IonNote, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { pin, send, videocam } from 'ionicons/icons';

interface ChatMessage {
  text: string;
  sender: 'sent' | 'received';
  time: string;
}

@Component({
  selector: 'app-pvt-chat-data',
  templateUrl: './pvt-chat-data.page.html',
  styleUrls: ['./pvt-chat-data.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonIcon, IonTextarea, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonAvatar, IonNote, IonFooter]
})
export class PvtChatDataPage implements OnInit {
  // Grab a reference to the content scroll window container
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // Bound variable tracking user text input state
  newMessageText: string = '';

  // Seeded mock backend message logs structure
  messages: ChatMessage[] = [
    {
      text: 'Hello! How can I help you complete your Ionic 7 interface design today?',
      sender: 'received',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  constructor() {
    addIcons({ send, pin, videocam })
  }

  ngOnInit() {
  }

  // Executed on Send icon interactions
  sendMessage() {
    // Prevent routing or saving completely white space inputs
    if (!this.newMessageText.trim()) return;

    // 1. Instantly inject the new tracking data footprint
    this.messages.push({
      text: this.newMessageText.trim(),
      sender: 'sent',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // 2. Wipe the structural text box cleanly
    this.newMessageText = '';

    // 3. Command viewport window to scroll down directly to see update frames
    this.scrollToBottom();

    // Optional: Simulating a mock reply from an API or Bot after 1 second
    setTimeout(() => {
      this.simulateIncomingReply();
    }, 1000);
  }

  simulateIncomingReply() {
    this.messages.push({
      text: 'Received! Your view template pipeline updated cleanly.',
      sender: 'received',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    this.scrollToBottom();
  }

  scrollToBottom() {
    // 300ms transition length ensures smooth movement actions
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(300);
      }
    }, 100);
  }

}
