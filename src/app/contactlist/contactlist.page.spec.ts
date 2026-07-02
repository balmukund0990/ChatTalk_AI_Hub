import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactlistPage } from './contactlist.page';

describe('ContactlistPage', () => {
  let component: ContactlistPage;
  let fixture: ComponentFixture<ContactlistPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
