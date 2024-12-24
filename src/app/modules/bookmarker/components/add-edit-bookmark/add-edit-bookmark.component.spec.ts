import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBookmarkComponent } from './add-edit-bookmark.component';

describe('AddEditBookmarkComponent', () => {
  let component: AddEditBookmarkComponent;
  let fixture: ComponentFixture<AddEditBookmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBookmarkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditBookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
