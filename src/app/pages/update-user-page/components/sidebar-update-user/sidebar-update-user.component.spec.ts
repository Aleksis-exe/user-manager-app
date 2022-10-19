import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUpdateUserComponent } from './sidebar-update-user.component';

describe('SidebarUpdateUserComponent', () => {
  let component: SidebarUpdateUserComponent;
  let fixture: ComponentFixture<SidebarUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarUpdateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
