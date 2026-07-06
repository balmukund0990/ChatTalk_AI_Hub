import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PvtChatDataPage } from './pvt-chat-data.page';

describe('PvtChatDataPage', () => {
  let component: PvtChatDataPage;
  let fixture: ComponentFixture<PvtChatDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PvtChatDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
