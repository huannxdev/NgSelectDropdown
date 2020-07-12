import { Injectable } from '@angular/core';
import { NgSelectDropdownComponent } from '../components/ng-select-dropdown.component';

@Injectable()
export class DropdownService {
  private select: NgSelectDropdownComponent;

  public register(select: NgSelectDropdownComponent): void {
    this.select = select;
  }

  public getSelect(): NgSelectDropdownComponent {
    return this.select;
  }
}
