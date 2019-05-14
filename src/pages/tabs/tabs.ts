import { Component, ViewChild } from '@angular/core';
import { AddPage } from '../add/add';
import { HomePage } from '../home/home';
import { ScanPage } from '../scan/scan';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('tabs')
  tabs;

  homeRoot = HomePage;
  scanRoot = ScanPage;
  addRoot = AddPage;
}
