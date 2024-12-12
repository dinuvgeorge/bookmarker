import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, Observable, of } from 'rxjs';
import { Bookmark } from '../models/bookmark';
import { BookmarkDto } from '../api-inmemory-data/dto/bookmark-dto';

@Injectable({
  providedIn: 'root',
})
export class BookmarkApiService {
  httpClient = inject(HttpClient);

  private baseApi = 'api/items';

  getAllBookmarks(): Observable<Bookmark[]> {
    return this.httpClient
      .get<BookmarkDto[]>(this.baseApi)
      .pipe(map((books) => books || []));
  }
  getBookmarkById(id: number): Observable<Bookmark> {
    return this.httpClient.get<BookmarkDto>(`${this.baseApi}/${id}`);
  }

  createBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.httpClient.post<BookmarkDto>(this.baseApi, bookmark);
  }

  updateBookmark(bookmark: Bookmark): Observable<Bookmark> {
    return this.httpClient.put<BookmarkDto>(
      `${this.baseApi}/${bookmark.id}`,
      bookmark,
    );
  }
}
