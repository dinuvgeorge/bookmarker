import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { BookmarkDto } from '../dto/bookmark-dto';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataBookmarkService implements InMemoryDbService {
  items: BookmarkDto[] = [
    {
      id: 1,
      name: 'Angular',
      url: 'https://angular.io/',
      createDate: new Date(Date.now()),
      modifiedDate: new Date(Date.now()),
    },
    {
      id: 2,
      name: 'NgRx',
      url: 'https://ngrx.io/',
      createDate: new Date(Date.now() - 86400000),
      modifiedDate: new Date(Date.now() - 86400000),
    },
    {
      id: 3,
      name: 'Typescript - Javascript that scales',
      url: 'https://www.typescriptlang.org/',
      createDate: new Date(Date.now() - 172800000),
      modifiedDate: new Date(Date.now() - 172800000),
    },
    {
      id: 4,
      name: 'RxJS - A reactive programming library for JavaScript',
      url: 'https://rxjs.dev/',
      createDate: new Date(Date.now() - 172800000),
      modifiedDate: new Date(Date.now() - 172800000),
    },
  ];

  createDb() {
    return { items: this.items };
  }
}
