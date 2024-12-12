import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Bookmark } from '../../models/bookmark';

export const selectBookmarksState =
  createFeatureSelector<ReadonlyArray<Bookmark>>('bookmarks');

export const selectBookmark = createSelector(
  selectBookmarksState,
  (books) => books,
);
