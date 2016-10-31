import { Component } from '@angular/core';

import {SearchComponent} from "../search/search";
import {MyListsComponent} from "../mylists/mylists";
import {PharmacyComponent} from "../pharmacy/pharmacy";
import {SettingComponent} from "../settings/setting";
import {MovieListPage} from "../movie-list/movie-list";
import {PeopleComponent} from "../people/people.component";
import {WikipediaComponent} from "../wikipedia/wikipedia-component";
import {MapComponent} from "../map/map";
import {Platform, NavParams} from "ionic-angular";
import {AuthUser} from "../../model/mock/auth-user-mock";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  isAndroid: boolean = false;
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabPharmacies: any = PharmacyComponent;
  //tabSearch: any = MovieListPage;
  tabSearch: any = SearchComponent;
  tabMyLists: any = MyListsComponent;
  tabSettings: any = SettingComponent;
  tabPeople: any = PeopleComponent;
  tabWikipedia: any = WikipediaComponent;
  tabMap: any = MapComponent;
  authUser = AuthUser;

  constructor(private platform: Platform, private navParams: NavParams) {
    this.isAndroid = platform.is('android');
    this.authUser = navParams.get('authUser');
  }
}
