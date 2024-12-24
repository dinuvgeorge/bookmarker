import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BookmarkApiService } from '../../api-services/bookmark-api.service';
import { BookmarksActions } from '../../../store/bookmarker/bookmark.actions';
import { BookmarkState } from '../../../store/bookmarker/bookmark.reducer';

@Component({
  selector: 'app-edit-bookmark',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatCardActions,
    MatButton,
    MatInput,
    MatLabel,
  ],
  templateUrl: './add-edit-bookmark.component.html',
  styleUrl: './add-edit-bookmark.component.scss',
})
export class AddEditBookmarkComponent {
  store = inject(Store);
  bookmarkApiService = inject(BookmarkApiService);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  formBuilder = inject(FormBuilder);

  form: FormGroup;
  id!: number;
  isAddMode = true;

  constructor() {
    let param = this.activatedRoute.snapshot.params['id'];
    if (param) {
      this.id = Number(param);
    }
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      url: ['', Validators.required],
    });

    if (!this.isAddMode) {
      this.bookmarkApiService.getBookmarkById(this.id).subscribe((item) => {
        this.form.patchValue(item);
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  onCancel() {
    this.store.dispatch(
      BookmarksActions.updateBookmarkSearchText({ text: '' }),
    );
    this.router.navigate(['/'], { relativeTo: this.activatedRoute });
  }

  private createUser() {
    const newBookmark = {
      name: this.form.value.name,
      url: this.form.value.url,
      createDate: new Date(),
      modifiedDate: new Date(),
    } as BookmarkState;

    this.bookmarkApiService
      .createBookmark(newBookmark)
      .pipe()
      .subscribe((savedBookmark) => {
        this.store.dispatch(
          BookmarksActions.updateBookmarkSearchText({ text: '' }),
        );
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      });
  }

  private updateUser() {
    const bookmark = {
      id: this.id,
      name: this.form.value.name,
      url: this.form.value.url,
      createDate: new Date(),
      modifiedDate: new Date(),
    } as BookmarkState;

    this.bookmarkApiService
      .updateBookmark(bookmark)
      .pipe()
      .subscribe((savedBookmark) => {
        this.store.dispatch(
          BookmarksActions.updateBookmarkSearchText({ text: '' }),
        );
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      });
  }
}
