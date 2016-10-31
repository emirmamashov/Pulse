import { Component } from '@angular/core';
import {WikipediaService} from "../../services/wikipedia-service";
@Component({
  template: `
     <div>
      <h2>Wikipedia Search</h2>
      <input #term type="text" (keyup)="search(term.value)">
      <ul>
        <li *ngFor="let item of items">{{item}}</li>
      </ul>
    </div> 
  `
})
export class WikipediaComponent {
  items: Array<string>;

  constructor(private wikipediaService: WikipediaService) {}

  search(term) {
    this.wikipediaService.search(term).then(items => this.items = items);
  }
}

/*
 Copyright 2016 thoughtram GmbH. All Rights Reserved.
 Use of this source code is governed by an TTML-style license that
 can be found in the license.txt file at http://thoughtram.io/license.txt
 */
