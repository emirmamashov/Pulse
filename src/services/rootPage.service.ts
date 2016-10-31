import { Injectable, ViewChild } from '@angular/core';
import {AboutPage} from "../pages/about/about";
import {Nav} from "ionic-angular";

@Injectable()
export class RootPageService {
  private rootPage: any = AboutPage;
  @ViewChild(Nav) nav: Nav;

  getRootPage(): any {
    return this.rootPage;
  }
  setRootPage(component: any): void {
    this.rootPage = component;
  }
  setRoot(page: any): void {
    this.nav.setRoot(page);
  }
}
