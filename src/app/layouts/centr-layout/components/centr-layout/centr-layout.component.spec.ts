import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentrLayoutComponent } from './centr-layout.component';

describe('CentrLayoutComponent', () => {
  let component: CentrLayoutComponent;
  let fixture: ComponentFixture<CentrLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentrLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CentrLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
