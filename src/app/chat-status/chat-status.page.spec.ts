import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatStatusPage } from './chat-status.page';

describe('ChatStatusPage', () => {
  let component: ChatStatusPage;
  let fixture: ComponentFixture<ChatStatusPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
