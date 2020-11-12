import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ng-select-dropdown';
  public options = [
    {label: 'Pellentesque 1Pellentesque 1Pellentesque 1Pellentesque 2231', value: 'Pellentesque 1'},
    {label: 'Pellentesque 2', value: 'Pellentesque 2'},
    {label: 'Pellentesque 3', value: 'Pellentesque 3'},
    {label: 'Pellentesque 4', value: 'Pellentesque 4'},
    {label: 'Pellentesque 5', value: 'Pellentesque 5'},
    {label: 'Pellentesque 6', value: 'Pellentesque 6'},
    {label: 'Pellentesque 7', value: 'Pellentesque 7'},
    {label: 'Pellentesque 8', value: 'Pellentesque 8'},
    {label: 'Pellentesque 9', value: 'Pellentesque 9'},
    {label: 'Pellentesque 1a', value: 'Pellentesque 1a'},
    {label: 'Pellentesque 1b', value: 'Pellentesque 1b'},
    {label: 'Pellentesque 1c', value: 'Pellentesque 1c'},
    {label: 'Pellentesque 1d', value: 'Pellentesque 1d'},
  ];

  public group = [{label: 'Group 1', items: [
    {label: 'Pellentesque 1', value: 'Pellentesque 1'},
    {label: 'Pellentesque 2', value: 'Pellentesque 2'},
    {label: 'Pellentesque 3', value: 'Pellentesque 3'},
    {label: 'Pellentesque 4', value: 'Pellentesque 4'},
    {label: 'Pellentesque 5', value: 'Pellentesque 5'},
    {label: 'Pellentesque 6', value: 'Pellentesque 6'},
    {label: 'Pellentesque 7', value: 'Pellentesque 7'},
    {label: 'Pellentesque 8', value: 'Pellentesque 8'},
    {label: 'Pellentesque 9', value: 'Pellentesque 9'},
    {label: 'Pellentesque 1a', value: 'Pellentesque 1a'},
    {label: 'Pellentesque 1b', value: 'Pellentesque 1b'},
    {label: 'Pellentesque 1c', value: 'Pellentesque 1c'},
    {label: 'Pellentesque 1d', value: 'Pellentesque 1d'},
  ]},
  {label: 'Group 2', items: [
    {label: 'Pellentesque 12', value: 'Pellentesque 12'},
    {label: 'Pellentesque 22', value: 'Pellentesque 22'},
    {label: 'Pellentesque 32', value: 'Pellentesque 32'},
    {label: 'Pellentesque 42', value: 'Pellentesque 42'},
    {label: 'Pellentesque 52', value: 'Pellentesque 52'},
    {label: 'Pellentesque 62', value: 'Pellentesque 62'},
    {label: 'Pellentesque 72', value: 'Pellentesque 72'},
    {label: 'Pellentesque 82', value: 'Pellentesque 82'},
    {label: 'Pellentesque 92', value: 'Pellentesque 92'},
    {label: 'Pellentesque 1a2', value: 'Pellentesque 1a2'},
    {label: 'Pellentesque 1b2', value: 'Pellentesque 1b2'},
    {label: 'Pellentesque 1c2', value: 'Pellentesque 1c2'},
    {label: 'Pellentesque 1d2', value: 'Pellentesque 1d2'},
  ]}];
}
