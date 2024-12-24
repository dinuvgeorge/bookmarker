import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { BookmarkDto } from '../../../api-inmemory-data/dto/bookmark-dto';
import { BookmarkState } from '../../store/bookmarker/bookmark.reducer';

@Injectable({
  providedIn: 'root',
})
export class BookmarkApiService {
  httpClient = inject(HttpClient);

  private baseApi = 'api/items';

  getAllBookmarks(): Observable<BookmarkState[]> {
    return this.httpClient
      .get<BookmarkDto[]>(this.baseApi)
      .pipe(map((books) => books || []));
  }

  getBookmarkById(id: number): Observable<BookmarkState> {
    return this.httpClient.get<BookmarkDto>(`${this.baseApi}/${id}`);
  }

  createBookmark(bookmark: BookmarkState): Observable<BookmarkState> {
    return this.httpClient.post<BookmarkDto>(this.baseApi, bookmark);
  }

  updateBookmark(bookmark: BookmarkState): Observable<BookmarkState> {
    return this.httpClient.put<BookmarkDto>(
      `${this.baseApi}/${bookmark.id}`,
      bookmark,
    );
  }
}
