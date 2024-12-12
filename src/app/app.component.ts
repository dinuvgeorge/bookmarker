import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WmatToolbarComponent } from 'wmat-components';
import { BookmarkService } from './services/bookmark.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WmatToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  bookmarkService = inject(BookmarkService);
}
