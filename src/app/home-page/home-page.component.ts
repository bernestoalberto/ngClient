import { Component } from '@angular/core';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  url: string;
  height: number;
  width: number;

}
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  tiles: Tile[] = [
    {text: 'Notary Signing Agent', cols: 3, rows: 3, color: 'lightblue', url:'#', width: 700, height: 100},
    {text: 'Credit Score', cols: 1, rows: 3, color: 'lightgreen',url:'#', width: 500, height: 100},
    {text: 'Immigration', cols: 3, rows: 3, color: 'lightpink', url:'#', width: 500, height: 100},
    {text: 'Tax Return', cols: 1, rows: 3, color: '#DDBDF1', url:'#', width: 500, height: 100},
  ];
  shareTooltip = 'Share the Service';
  likeTooltip = 'Like the Service';1
  snTooltip = 'Like the Service';
  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));

}
