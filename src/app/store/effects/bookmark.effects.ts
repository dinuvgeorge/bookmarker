import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarksActions } from '../actions/bookmark.actions';

@Injectable({ providedIn: 'root' })
export class BookmarkEffects {
  actions$ = inject(Actions);

  getFilteredBookmarksEffect$ = createEffect(() =>
    this.actions$.pipe(ofType(BookmarksActions.searchBookmarks)),
  );
}
