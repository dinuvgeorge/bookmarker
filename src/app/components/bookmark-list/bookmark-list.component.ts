import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { BookmarkApiService } from '../../api-services/bookmark-api.service';
import { selectBookmark } from '../../store/selectors/bookmarks.selectors';
import { BookmarksActions } from '../../store/actions/bookmark.actions';
import { RouterLink } from '@angular/router';
import { BookmarkEffects } from '../../store/effects/bookmark.effects';
import { map, switchMap } from 'rxjs';
import { Bookmark } from '../../models/bookmark';

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
  bookmarkEffects = inject(BookmarkEffects);
  bookmarks: Bookmark[] = [];

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
        this.bookmarks = updatedBookmarks;
      });
  }

  ngOnInit() {
    this.bookmarkService.getAllBookmarks().subscribe((bookmarks) => {
      this.bookmarks = bookmarks;
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
}
