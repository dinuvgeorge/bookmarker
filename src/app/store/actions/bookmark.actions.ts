import { createActionGroup, props } from '@ngrx/store';
import { Bookmark } from '../../models/bookmark';

export const BookmarksActions = createActionGroup({
  source: 'Bookmarks',
  events: {
    'Retrieved Bookmark List': props<{ bookmarks: ReadonlyArray<Bookmark> }>(),
    'Add Bookmark': props<Bookmark>(),
    'Update Bookmark': props<Bookmark>(),
    'Remove Bookmark': props<{ bookmarkId: number }>(),
    'Search Bookmarks': props<{ text: string }>(),
  },
});