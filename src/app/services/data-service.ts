import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private itemSource = new BehaviorSubject<any>(null);
  selectedItem$ = this.itemSource.asObservable();

  setSelectedItem(item: any) {
    this.itemSource.next(item);
  }
}
