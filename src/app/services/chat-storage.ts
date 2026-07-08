import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export interface ChatMessage {
  sender: 'sent' | 'received'; // Matches your ngClass layout styles
  text: string;               // Matches {{ msg.text }}
  time: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatStorage {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  // Initialize the database
  async init() {
    try {
      // 1. Inform Ionic Storage about the external SQLite engine
      await this.storage.defineDriver(CordovaSQLiteDriver);

      // 2. Safely manifest the persistent database connection
      this._storage = await this.storage.create();
      console.log('Database initialized successfully using:', this.storage.driver);
    } catch (error) {
      console.error('Storage Initialization Error:', error);
    }
  }

  // Save a new message to a specific user's history
  async saveMessage(userId: string, sender: 'sent' | 'received', text: string, time: string): Promise<void> {
    const history = await this.getChatHistory(userId);

    const newMessage: ChatMessage = { sender, text, time };
    history.push(newMessage);

    await this._storage?.set(userId, history);
  }

  // Retrieve the unique chat history array array
  async getChatHistory(userId: string): Promise<ChatMessage[]> {
    if (!this._storage) {
      // Small grace buffer case if component fires before init resolves
      await this.init();
    }
    const history = await this._storage?.get(userId);
    return history ? history : [];
  }

  // Clear chat history for a specific user
  async clearChatHistory(userId: string): Promise<void> {
    await this._storage?.remove(userId);
  }
}
