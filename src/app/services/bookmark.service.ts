import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { UUID } from '../core/uuid';
import { Bookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class BookmarkService implements InMemoryDbService {
  items: Bookmark[] = [
    {
      id: new UUID().value,
      name: 'Angular',
      url: 'https://angular.io/',
      createDate: new Date(),
    },
    {
      id: new UUID().value,
      name: 'NgRx',
      url: 'https://ngrx.io/',
      createDate: new Date(),
    },
    {
      id: new UUID().value,
      name: 'Typescript - Javascript that scales',
      url: 'https://www.typescriptlang.org/',
      createDate: new Date(),
    },
    {
      id: new UUID().value,
      name: 'RxJS - A reactive programming library for JavaScript',
      url: 'https://rxjs.dev/',
      createDate: new Date(),
    },
  ];

  constructor() {}

  createDb() {
    return { items: this.items };
  }

  getAllItems(reqInfo: any): Observable<Bookmark[]> {
    const items = this.items;
    return reqInfo.utils.createResponse$(() => ({
      body: items,
      status: 200,
    }));
  }

  getItemById(reqInfo: any): Observable<Bookmark[]> {
    const id = reqInfo.id;
    const item = this.items.find((i: any) => i.id === id);
    return reqInfo.utils.createResponse$(() => ({
      body: item,
      status: item ? 200 : 404,
    }));
  }

  addNewItem(reqInfo: any): Observable<Bookmark[]> {
    const newItem = reqInfo.utils.getJsonBody(reqInfo.req);
    newItem.id = this.items.length + 1; // Generate a new id
    this.items.push(newItem);
    return reqInfo.utils.createResponse$(() => ({
      body: newItem,
      status: 201,
    }));
  }

  updateItem(reqInfo: any): Observable<Bookmark[]> {
    const id = reqInfo.id;
    const updatedItem = reqInfo.utils.getJsonBody(reqInfo.req);
    const index = this.items.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updatedItem };
      return reqInfo.utils.createResponse$(() => ({
        body: this.items[index],
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Item not found' },
        status: 404,
      }));
    }
  }

  // DELETE item
  deleteItem(reqInfo: any): Observable<Bookmark[]> {
    const id = reqInfo.id;
    const index = this.items.findIndex((i: any) => i.id === id);
    if (index !== -1) {
      const deletedItem = this.items.splice(index, 1)[0];
      return reqInfo.utils.createResponse$(() => ({
        body: deletedItem,
        status: 200,
      }));
    } else {
      return reqInfo.utils.createResponse$(() => ({
        body: { error: 'Item not found' },
        status: 404,
      }));
    }
  }
}
