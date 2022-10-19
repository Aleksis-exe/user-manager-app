import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarCreateUserComponent } from './sidebar-create-user.component';

describe('SidebarCreateUserComponent', () => {
  let component: SidebarCreateUserComponent;
  let fixture: ComponentFixture<SidebarCreateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarCreateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarCreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
