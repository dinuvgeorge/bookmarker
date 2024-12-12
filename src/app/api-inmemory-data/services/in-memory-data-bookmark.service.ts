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
      createDate: new Date(),
    },
    {
      id: 2,
      name: 'NgRx',
      url: 'https://ngrx.io/',
      createDate: new Date(),
    },
    {
      id: 3,
      name: 'Typescript - Javascript that scales',
      url: 'https://www.typescriptlang.org/',
      createDate: new Date(),
    },
    {
      id: 4,
      name: 'RxJS - A reactive programming library for JavaScript',
      url: 'https://rxjs.dev/',
      createDate: new Date(),
    },
  ];

  createDb() {
    return { items: this.items };
  }
}
