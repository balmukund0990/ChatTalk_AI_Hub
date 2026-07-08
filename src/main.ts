import { importProvidersFrom, PLATFORM_ID, provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { IonicStorageModule, provideStorage, StorageConfigToken } from "@ionic/storage-angular";

bootstrapApplication(AppComponent, {
  providers: [
    provideZoneChangeDetection(), { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular({
      scrollPadding: true,
      scrollAssist: true
    }),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(
      IonicStorageModule.forRoot({
        name: '__chatdb',
        driverOrder: [CordovaSQLiteDriver._driver, 'sqlite', 'indexeddb', 'websql']
      })
    ),
    {
      provide: StorageConfigToken,
      useValue: {
        name: '__chatdb',
        // Driver chain fallback priority list
        driverOrder: [
          CordovaSQLiteDriver._driver, // Native Mobile SQLite
          'indexeddb',                // Web Browser (development fallback)
          'websql',                   // Legacy Browser fallback
          'localstorage'              // Absolute basic fallback
        ]
      }
    },
    {
      provide: Storage,
      useFactory: provideStorage,
      deps: [PLATFORM_ID, StorageConfigToken]
    }
  ],
});
