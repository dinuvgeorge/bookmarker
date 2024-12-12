import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { BookmarkApiService } from '../../api-services/bookmark-api.service';
import { selectBookmark } from '../../store/selectors/bookmarks.selectors';
import { BookmarksActions } from '../../store/actions/bookmark.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [AsyncPipe, MatIcon, RouterLink],
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.scss',
})
export class BookmarkListComponent implements OnInit {
  store = inject(Store);
  bookmarkService = inject(BookmarkApiService);

  bookmarks$ = this.store.select(selectBookmark);

  onRemove(bookmarkId: number) {
    this.store.dispatch(BookmarksActions.removeBookmark({ bookmarkId }));
  }

  ngOnInit() {
    this.bookmarkService
      .getAllBookmarks()
      .subscribe((bookmarks) =>
        this.store.dispatch(
          BookmarksActions.retrievedBookmarkList({ bookmarks }),
        ),
      );
  }
}
