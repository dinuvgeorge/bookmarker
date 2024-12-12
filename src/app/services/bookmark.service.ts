import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService {
  private itemsUrl = 'api/items'; // URL to web api

  constructor(private http: HttpClient) {}

  getItems(): Observable<Bookmark[]> {
    return this.http.get<any[]>(this.itemsUrl);
  }
}
