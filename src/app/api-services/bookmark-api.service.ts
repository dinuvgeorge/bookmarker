import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkApiService {
  httpClient = inject(HttpClient);

  private baseApi = 'api/items';

  getAllBookmarks(): Observable<Bookmark[]> {
    return this.httpClient
      .get<Bookmark[]>(this.baseApi)
      .pipe(map((books) => books || []));
  }
  getBookmarkById(id: number): Observable<Bookmark> {
    return this.httpClient.get<Bookmark>(`${this.baseApi}/${id}`);
  }

  createBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.httpClient.post<Bookmark>(this.baseApi, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.httpClient.put<Bookmark>(
      `${this.baseApi}/${bookmark.id}`,
      bookmark,
    );
  }
}
