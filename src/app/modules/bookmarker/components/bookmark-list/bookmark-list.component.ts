import { Component, inject, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { BookmarkApiService } from '../../api-services/bookmark-api.service';
import { selectBookmark } from '../../../store/bookmarker/bookmarks.selectors';
import { BookmarksActions } from '../../../store/bookmarker/bookmark.actions';
import { RouterLink } from '@angular/router';
import { BookmarkEffects } from '../../../store/bookmarker/bookmark.effects';
import { map, switchMap } from 'rxjs';
import {
  MatList,
  MatListItem,
  MatListSubheaderCssMatStyler,
} from '@angular/material/list';
import { BookmarkState } from '../../../store/bookmarker/bookmark.reducer';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [
    MatIcon,
    RouterLink,
    MatList,
    MatListItem,
    MatListSubheaderCssMatStyler,
  ],
  templateUrl: './bookmark-list.component.html',
  styleUrl: './bookmark-list.component.scss',
})
export class BookmarkListComponent implements OnInit {
  store = inject(Store);
  bookmarkService = inject(BookmarkApiService);
  bookmarkEffects = inject(BookmarkEffects);
  bookmarksList: {
    type: 'TODAY' | 'YESTERDAY' | 'OLDER';
    bookmarks: BookmarkState[];
  }[] = [];

  constructor() {
    this.bookmarkEffects.filteredBookmarksEffect$
      .pipe(
        switchMap((searchData) => {
          return this.store
            .select(selectBookmark)
            .pipe(
              map((data) =>
                data.filter((bookmark) =>
                  this.fuzzyMatch(searchData.text, bookmark.name),
                ),
              ),
            );
        }),
      )
      .subscribe((updatedBookmarks) => {
        this.updateBookmarksList(updatedBookmarks);
      });
  }

  ngOnInit() {
    this.bookmarkService.getAllBookmarks().subscribe((bookmarks) => {
      this.updateBookmarksList(bookmarks);
      this.store.dispatch(
        BookmarksActions.retrievedBookmarkList({ bookmarks }),
      );
    });
  }

  onRemove(bookmarkId: number) {
    this.store.dispatch(BookmarksActions.removeBookmark({ bookmarkId }));
  }

  private fuzzyMatch(pattern: string, str: string) {
    pattern =
      '.*' +
      pattern
        .split('')
        .map((l) => `${l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*`)
        .join('');
    const re = new RegExp(pattern, 'i');
    return re.test(str);
  }

  private updateBookmarksList(bookmarks: BookmarkState[]) {
    this.bookmarksList = [];
    this.bookmarksList.push({
      type: 'TODAY',
      bookmarks: bookmarks.filter(
        (bookmark) =>
          this.checkDate(bookmark.modifiedDate.toString()) === 'TODAY',
      ),
    });

    this.bookmarksList.push({
      type: 'YESTERDAY',
      bookmarks: bookmarks.filter(
        (bookmark) =>
          this.checkDate(bookmark.modifiedDate.toString()) === 'YESTERDAY',
      ),
    });

    this.bookmarksList.push({
      type: 'OLDER',
      bookmarks: bookmarks.filter(
        (bookmark) =>
          this.checkDate(bookmark.modifiedDate.toString()) === 'OLDER',
      ),
    });
  }

  private checkDate(dateString: string): 'TODAY' | 'YESTERDAY' | 'OLDER' {
    const date = new Date(dateString);
    const today = new Date();

    const startOfToday = new Date(today.setHours(0, 0, 0, 0));
    const startOfYesterday = new Date(startOfToday);

    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const startOfGivenDate = new Date(date.setHours(0, 0, 0, 0));

    if (startOfGivenDate.getTime() === startOfToday.getTime()) {
      return 'TODAY';
    } else if (startOfGivenDate.getTime() === startOfYesterday.getTime()) {
      return 'YESTERDAY';
    } else {
      return 'OLDER';
    }
  }
}
