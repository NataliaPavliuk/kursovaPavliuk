import { Component, OnInit } from '@angular/core';
import {MDCDrawer} from "@material/drawer";
import {MDCTopAppBar} from "@material/top-app-bar";

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
    const list = document.querySelector('.mdc-drawer .mdc-list');
    const mainContent = document.querySelector('.main-content');
    const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));

    topAppBar.setScrollTarget(document.getElementById('main-content'));
    topAppBar.listen('MDCTopAppBar:nav', () => {
      drawer.open = !drawer.open;

    });

    list.addEventListener('click', (event) => {
      (mainContent.querySelector('input, button') as HTMLCanvasElement).focus();
    });

    document.body.addEventListener('MDCDrawer:closed', () => {
      (mainContent.querySelector('input, button') as HTMLCanvasElement).focus();
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    });
  }

}
