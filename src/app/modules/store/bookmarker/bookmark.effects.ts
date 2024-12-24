import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { BookmarksActions } from './bookmark.actions';

@Injectable({ providedIn: 'root' })
export class BookmarkEffects {
  actions$ = inject(Actions);

  filteredBookmarksEffect$ = createEffect(() =>
    this.actions$.pipe(ofType(BookmarksActions.searchBookmarks)),
  );

  updateBookmarkSearchTextEffect$ = createEffect(() =>
    this.actions$.pipe(ofType(BookmarksActions.updateBookmarkSearchText)),
  );
}
