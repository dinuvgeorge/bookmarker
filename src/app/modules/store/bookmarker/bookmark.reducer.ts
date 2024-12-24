import {createReducer, on} from '@ngrx/store';
import {BookmarksActions} from './bookmark.actions';

export interface BookmarkState {
  id: number;
  name: string;
  url: string;
  createDate: Date;
  modifiedDate: Date;
}

export const initialState: ReadonlyArray<BookmarkState> = [];

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
);
