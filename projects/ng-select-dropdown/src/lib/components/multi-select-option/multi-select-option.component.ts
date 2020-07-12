import { Component, HostListener, Input } from '@angular/core';
import { DropdownService } from '../../providers/dropdown.service';
import { NgSelectDropdownComponent } from '../ng-select-dropdown.component';

@Component({
  selector: 'lib-multi-select-option',
  styleUrls: ['./multi-select-option.component.sass'],
  templateUrl: './multi-select-option.component.html',
})
export class MultiSelectOptionComponent {
  @Input()
  public value: string;

  @Input()
  public label: string;

  public checked: boolean;

  private select: NgSelectDropdownComponent;

  constructor(private dropdownService: DropdownService) {
    this.select = this.dropdownService.getSelect();
  }

  @HostListener('click', ['$event'])
  public onClick(event: UIEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.checked = !this.checked;
    this.select.selectOption(this);
  }
}
