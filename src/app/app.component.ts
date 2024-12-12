import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WmatToolbarComponent } from 'wmat-components';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { BookmarksActions } from './store/actions/bookmark.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    WmatToolbarComponent,
    RouterLink,
    MatToolbar,
    MatFormField,
    MatInput,
    MatIcon,
    MatToolbarRow,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  store = inject(Store);

  searchText = '';

  onSearch($event: string) {
    this.store.dispatch(BookmarksActions.searchBookmarks({ text: $event }));
  }
}
