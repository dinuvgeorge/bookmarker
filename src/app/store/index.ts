import { isDevMode } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { bookmarkReducer } from './reducers/bookmark.reducer';

export interface State {}

export const reducers: ActionReducerMap<State> = {
  bookmarks: bookmarkReducer,
};

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
