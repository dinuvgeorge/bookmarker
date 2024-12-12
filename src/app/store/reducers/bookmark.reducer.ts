import { createReducer, on } from '@ngrx/store';
import { BookmarksActions } from '../actions/bookmark.actions';
import { Bookmark } from '../../models/bookmark';

export const initialState: ReadonlyArray<Bookmark> = [];

export const bookmarkReducer = createReducer(
  initialState,
  on(
    BookmarksActions.retrievedBookmarkList,
    (_state, { bookmarks: bookmarks }) => bookmarks,
  ),
  on(BookmarksActions.removeBookmark, (state, bookmarkId) =>
    state.filter((bookmark) => bookmark.id !== bookmarkId.bookmarkId),
  ),
  on(BookmarksActions.updateBookmark, (state, bookmark) => {
    const index = state.findIndex((b) => b.id === bookmark.id);
    if (index > -1) {
      const updatedState = [...state];
      updatedState[index] = bookmark;
      return updatedState;
    }
    return [...state, bookmark];
  }),
  on(BookmarksActions.addBookmark, (state, bookmark) => {
    return [bookmark, ...state];
  }),
  on(BookmarksActions.searchBookmarks, (state, { text }) => {
    console.log(state, text);
    console.log('initialState', initialState);

    return state.filter((item) => fuzzyMatch(text, item.name));
  }),
);

export const fuzzyMatch = (pattern: string, str: string): boolean => {
  pattern =
    '.*' +
    pattern
      .split('')
      .map((l) => `${l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`)
      .join('');
  const re = new RegExp(pattern, 'i');
  return re.test(str);
};
