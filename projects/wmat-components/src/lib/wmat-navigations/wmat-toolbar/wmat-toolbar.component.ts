import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'wmat-toolbar',
  standalone: true,
  templateUrl: './wmat-toolbar.component.html',
  styleUrls: ['./wmat-toolbar.component.css'],
  imports: [MatToolbar],
})
export class WmatToolbarComponent {}
