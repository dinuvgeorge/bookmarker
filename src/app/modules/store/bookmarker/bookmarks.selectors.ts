import { createFeatureSelector, createSelector } from '@ngrx/store';

import { BookmarkState } from './bookmark.reducer';

export const selectBookmarksState =
  createFeatureSelector<ReadonlyArray<BookmarkState>>('bookmarks');

export const selectBookmark = createSelector(
  selectBookmarksState,
  (books) => books,
);
