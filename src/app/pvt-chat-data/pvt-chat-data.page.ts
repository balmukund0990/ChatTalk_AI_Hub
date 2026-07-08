import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList, IonItem, IonLabel, IonIcon, IonContent, IonTextarea, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonBackButton, IonAvatar, IonNote, IonFooter } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, send, videocam } from 'ionicons/icons';
import { DataService } from '../services/data-service';
import { Subscription } from 'rxjs';
import { ChatStorage } from '../services/chat-storage';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular/standalone';

export interface ChatMessage {
  text: string;
  sender: 'sent' | 'received';
  time: string;
}

@Component({
  selector: 'app-pvt-chat-data',
  templateUrl: './pvt-chat-data.page.html',
  styleUrls: ['./pvt-chat-data.page.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonIcon, IonTextarea, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonButton, IonBackButton, IonAvatar, IonNote, IonFooter],
  providers: [
    Storage
  ]
})
export class PvtChatDataPage implements OnInit {
  // Grab a reference to the content scroll window container
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  // Bound variable tracking user text input state
  newMessageText: string = '';
  private dataService = inject(DataService);
  selectedItem: any = null;
  private sub!: Subscription;
  userChatTitle = '';
  currentUserId: string = 'user_abc123';
  messages: ChatMessage[] = [];
  // currentUserMobile: string = ''; 

  // Seeded mock backend message logs structure
  // messages: ChatMessage[] = [
  //   {
  //     text: 'Hello! How can I help you complete your Ionic 7 interface design today?',
  //     sender: 'received',
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   }
  // ];

  constructor(public chatStorage: ChatStorage, private loadingCtrl: LoadingController) {
    addIcons({ send, addCircleOutline, videocam })
  }

  ngOnInit() {
    console.log('Private chat data ngoninit loaded...');
    this.sub = this.dataService.selectedItem$.subscribe(item => {
      this.selectedItem = item;
      this.currentUserId = this.selectedItem.category;
      this.setCamelCaseLtr(this.selectedItem.name);
      this.showLoading();
    });
    this.loadUserChatHistory();
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

  // Fetches targeted chat items from SQLite
  async loadUserChatHistory() {
    this.messages = await this.chatStorage.getChatHistory(this.currentUserId);
    this.scrollToBottom();
  }

  setCamelCaseLtr(str: any) {
    this.userChatTitle = str.replace(/[^a-zA-Z0-9]+(.)/g, (_: any, chr: any) => chr.toUpperCase())
      .replace(/^./, (match: any) => match.toUpperCase());
  }

  // Executed on Send icon interactions
  async sendMessage() {
    const textToSend = this.newMessageText.trim();
    if (!textToSend) return;

    // Clear input instantly for smooth UX
    this.newMessageText = '';

    // 1. Format human-readable time string
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 2. Save user message to SQLite array under this specific ID
    await this.chatStorage.saveMessage(this.currentUserId, 'sent', textToSend, currentTime);

    // 3. Refresh display list instantly
    await this.loadUserChatHistory();

    // ---- MOCK AI / RECIEVED REPLY (Remove or replace with your API endpoint) ----
    setTimeout(async () => {
      const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      await this.chatStorage.saveMessage(this.currentUserId, 'received', 'Got your message! Stored safely in SQLite.', responseTime);
      await this.loadUserChatHistory();
    }, 1200);
  }

  // sendMessage() {
  //   // Prevent routing or saving completely white space inputs
  //   if (!this.newMessageText.trim()) return;

  //   // 1. Instantly inject the new tracking data footprint
  //   this.messages.push({
  //     text: this.newMessageText.trim(),
  //     sender: 'sent',
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   });

  //   // 2. Wipe the structural text box cleanly
  //   this.newMessageText = '';

  //   // 3. Command viewport window to scroll down directly to see update frames
  //   this.scrollToBottom();

  //   // Optional: Simulating a mock reply from an API or Bot after 1 second
  //   setTimeout(() => {
  //     this.simulateIncomingReply();
  //   }, 1000);
  // }

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
