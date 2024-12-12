import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WmatToolbarComponent } from 'wmat-components';
import { BookmarkService } from './services/bookmark.service';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WmatToolbarComponent, AsyncPipe, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bookmarkService = inject(BookmarkService);

  bookmarks = this.bookmarkService.getItems();

  goToBookmarkURL(url: string) {
    window.open(url, '_blank');
  }
}
