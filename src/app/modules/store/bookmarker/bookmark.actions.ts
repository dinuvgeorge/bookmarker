import { createActionGroup, props } from '@ngrx/store';

import { BookmarkState } from './bookmark.reducer';

export const BookmarksActions = createActionGroup({
  source: 'Bookmarks',
  events: {
    'Retrieved Bookmark List': props<{
      bookmarks: ReadonlyArray<BookmarkState>;
    }>(),
    'Add Bookmark': props<BookmarkState>(),
    'Update Bookmark': props<BookmarkState>(),
    'Remove Bookmark': props<{ bookmarkId: number }>(),
    'Update Bookmark Search Text': props<{ text: string }>(),
    'Search Bookmarks': props<{
      text: string;
    }>(),
  },
});
