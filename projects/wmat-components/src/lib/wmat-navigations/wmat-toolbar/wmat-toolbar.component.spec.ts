import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WmatToolbarComponent } from './wmat-toolbar.component';

describe('WmatToolbarComponent', () => {
  let component: WmatToolbarComponent;
  let fixture: ComponentFixture<WmatToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WmatToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WmatToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
