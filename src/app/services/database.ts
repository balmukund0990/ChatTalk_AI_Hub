import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class Database {
  private sqliteConnection: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private dbInstance!: SQLiteDBConnection;

  async initializeDatabase() {
    try {
      this.dbInstance = await this.sqliteConnection.createConnection(
        'my_app_db', // Database name
        false,       // Encrypted flag
        'no-encryption',
        1,           // Database version
        false        // Read-only flag
      );

      await this.dbInstance.open();
      await this.createTables();
    } catch (error) {
      console.error('Database setup failed:', error);
    }
  }

  // Create your database tables
  private async createTables() {
    const schema = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      );
    `;
    await this.dbInstance.execute(schema);
  }

  // Write Data (Create/Update/Delete)
  async executeQuery(query: string, values: any[] = []) {
    return await this.dbInstance.run(query, values);
  }

  // Read Data (Select Queries)
  async selectQuery(query: string, values: any[] = []) {
    const result = await this.dbInstance.query(query, values);
    return result.values || [];
  }
}
