import { CanActivateFn, Routes, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  return of(true);
};

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/bookmark-list/bookmark-list.component').then(
        (m) => m.BookmarkListComponent,
      ),
  },
  {
    path: 'add',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/add-edit-bookmark/add-edit-bookmark.component').then(
        (m) => m.AddEditBookmarkComponent,
      ),
  },
  {
    path: 'edit/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/add-edit-bookmark/add-edit-bookmark.component').then(
        (m) => m.AddEditBookmarkComponent,
      ),
  },
];
