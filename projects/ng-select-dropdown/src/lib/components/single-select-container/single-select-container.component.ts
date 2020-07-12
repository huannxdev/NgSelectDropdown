import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewChecked,
} from '@angular/core';
import { NameValueSelect } from '../../model/NameValue.model';
import { NameValueGroup } from '../../model/NameValueGroup.model';

@Component({
  selector: 'lib-single-select-container',
  templateUrl: './single-select-container.component.html',
  styleUrls: ['./single-select-container.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleSelectContainerComponent implements AfterViewChecked {
  @Input()
  public options: NameValueSelect[] | NameValueGroup[];
  @Input()
  public activedItemValue: string;
  @Input()
  public group: boolean;
  @Output()
  public selectItemEmitter: EventEmitter<NameValueSelect> = new EventEmitter<
    NameValueSelect
  >();

  @Output()
  public removeItemEmitter: EventEmitter<string> = new EventEmitter<string>();
  private canSelectOption = true;
  constructor(private elementRef: ElementRef) {}

  public ngAfterViewChecked(): void {
    setTimeout(() => {
      this.scrollTo();
    }, 0);
  }

  public select(option: NameValueSelect): void {
    if (!this.canSelectOption) {
      this.canSelectOption = true;
      return;
    }
    this.selectItemEmitter.emit(option);
  }

  public remove(value: string): void {
    this.canSelectOption = false;
    this.removeItemEmitter.emit(value);
  }

  private scrollTo(): void {
    const element = this.elementRef.nativeElement.querySelector(
      `#item-${this.activedItemValue?.replace(' ', '-')}`
    );
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  }
}
