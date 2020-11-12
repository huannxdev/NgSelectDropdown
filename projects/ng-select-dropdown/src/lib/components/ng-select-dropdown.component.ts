import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DropdownService } from '../providers/dropdown.service';
import { MultiSelectOptionComponent } from './multi-select-option/multi-select-option.component';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { NameValueSelect } from '../model/NameValue.model';
import { NameValueGroup } from '../model/NameValueGroup.model';

@Component({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgSelectDropdownComponent),
    },
    DropdownService,
  ],
  selector: 'ng-select-dropdown',
  styleUrls: ['./ng-select-dropdown.component.sass'],
  templateUrl: './ng-select-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgSelectDropdownComponent implements AfterViewInit, OnDestroy, OnChanges, OnInit {
  @ViewChild('tagBlock')
  public tagBlock: ElementRef;
  @ViewChild(DropdownComponent)
  public dropdown: DropdownComponent;
  @ViewChildren(MultiSelectOptionComponent)
  public multiOptions: QueryList<MultiSelectOptionComponent>;
  @ViewChild('moreElement')
  public moreElement: ElementRef;
  @Input()
  public title: string;
  @Input()
  public multiple: boolean;
  @Input()
  public placeHolder: string;
  @Input()
  public isDisabled: boolean;
  @Input()
  set options(optionsInput: NameValueSelect[] | NameValueGroup[]) {
    this.orginalOptions = optionsInput;
    this.currentOptions = optionsInput;
  }
  @Input()
  public group: boolean;
  @Output() public removeItemOptionEvent: EventEmitter<string> = new EventEmitter<string>();

  public displayText: string;
  public dataMultiple: string[];
  public dataSingle: string;
  public displayData: any;
  public searchControl: FormControl;
  public currentOptions: NameValueSelect[] | NameValueGroup[] = [];
  public orginalOptions: NameValueSelect[] | NameValueGroup[] = [];

  public hideElements = 0;
  private $destroy: Subject<boolean> = new Subject<boolean>();
  private containerWidth = 0;
  private threedotWidth = 40;
  private indexNeedReCheck = -1;
  private contentToElementNeedReCheck = 0;
  private canOpenDropdown = true;

  constructor(
    private dropdownService: DropdownService,
    private changeDetechRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {
    this.dropdownService.register(this);
  }

  @ViewChildren('tag') tags: QueryList<ElementRef>;

  @HostListener('window: resize', [])
  public onResize(): void {
    this.calcItemsChange();
  }

  ngOnInit(): void {
    this.initFormSearch();
  }

  /**
   * init function for ng value accessor
   * onChangeFn
   * onTouchedFn
   */

  public onChangeFn = (_: any) => { };

  public onTouchedFn = () => { };

  /**
   * Registers on change, on touched
   */
  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.options && changes.options.currentValue !== changes.options.previousValue) {
      this.writeValue(this.dataMultiple || this.dataSingle);
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => {
      if (this.multiple) {
        this.displayData = [];
        this.multiOptions.map(option => {
          if (this.dataMultiple?.some(item => item === option.value)) {
            option.checked = true;
            this.displayData.push(option);
          }
        });
        this.calcItemsChange();
        this.changeDetechRef.detectChanges();
      }
    });
  }

  public showDropdown(): void {
    if (!this.canOpenDropdown) {
      this.canOpenDropdown = true;
      return;
    }
    this.dropdown.show();
    if (!this.multiOptions.length) {
      return;
    }
  }

  public hideDropdown(): void {
    this.dropdown.hide();
  }

  public onKeyDown(event: KeyboardEvent): void {
    if (
      ['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) >
      -1
    ) {
      if (!this.dropdown.showing) {
        this.showDropdown();
        return;
      }

      if (!this.multiOptions.length) {
        event.preventDefault();
        return;
      }
    }
  }

  public selectOption(option: MultiSelectOptionComponent): void {
    if (!this.dataMultiple) {
      this.dataMultiple = [];
    }
    this.displayData = this.displayData ? this.displayData : [];
    if (option.checked) {
      this.dataMultiple.push(option.value);
      this.displayData.push(option);
    } else {
      const index = this.dataMultiple.findIndex(item => item === option.value);
      if (index > -1) {
        this.dataMultiple.splice(index, 1);
        this.displayData.splice(index, 1);
      }
    }
    this.onChange(this.dataMultiple);
    this.calcItemsChange();
  }

  public writeValue(obj: any): void {
    if (this.multiple) {
      this.dataMultiple = obj;
      this.multiOptions?.map(
        option => (option.checked = this.dataMultiple?.includes(option.value))
      );
      this.displayData = this.dataMultiple?.map(el => {
        return {
          label: this.multiOptions
            ?.toArray()
            .find(option => option.value === el)?.label,
          value: el,
        };
      });
    } else {
      this.dataSingle = obj;
      this.displayData = this.group ? (this.options as NameValueGroup[])?.find(
        option => this.dataSingle && option.items.find(item => item.value === this.dataSingle)
      )?.label
        :
        (this.options as NameValueSelect[])?.find(
          option => this.dataSingle && option.value === this.dataSingle
        )?.label;
    }
  }

  public onChange(data: any): void {
    this.onChangeFn(data);
  }

  public removeItem(value: string): void {
    this.canOpenDropdown = false;
    const index = this.dataMultiple.findIndex(item => item === value);
    if (index > -1) {
      this.dataMultiple.splice(index, 1);
      this.onChange(this.dataMultiple);
      const indexOption = this.multiOptions
        .toArray()
        .findIndex(el => el.value === value);
      if (indexOption > -1) {
        this.multiOptions.toArray()[indexOption].checked = false;
      }
    }
    const indexData = this.displayData.findIndex(el => el.value === value);
    if (indexData > -1) {
      this.displayData.splice(indexData, 1);
    }
    this.calcItemsChange();
  }

  public ngOnDestroy(): void {
    this.$destroy.next(true);
    this.$destroy.complete();
  }

  public selectSingle(data: NameValueSelect): void {
    this.dataSingle = data.value;
    this.displayData = data.label;
    this.onChange(this.dataSingle);
    this.hideDropdown();
  }

  public handleRemoveElementOption(value: string): void {
    this.removeItemOptionEvent.emit(value);
  }

  public onDropdownClosed(): void {
    this.searchControl.setValue('');
  }

  public addOption(): void {
    (this.orginalOptions as NameValueSelect[]).push({value: this.searchControl.value, label: this.searchControl.value} as NameValueSelect);
    (this.currentOptions as NameValueSelect[]).push({value: this.searchControl.value, label: this.searchControl.value} as NameValueSelect);
    (this.currentOptions as NameValueSelect[]) = [...(this.currentOptions as NameValueSelect[])];
  }

  private calcItemsChange(): void {
    this.hideElements = 0;
    this.changeDetechRef.detectChanges();
    let totalElementWidth = 0;
    this.indexNeedReCheck = -1;
    const listTags = this.tags.toArray();
    for (let i = 0; i < listTags.length; i++) {
      listTags[i].nativeElement.style.visibility = 'visible';
      this.containerWidth = this.tagBlock.nativeElement.offsetWidth;
      if (
        listTags[i].nativeElement.offsetWidth +
        listTags[i].nativeElement.offsetLeft -
        this.tagBlock.nativeElement.offsetLeft >
        this.containerWidth - (this.hideElements > 0 ? this.threedotWidth : 0) && i > 0
      ) {
        listTags[i].nativeElement.style.visibility = 'hidden';
        this.hideElements += 1;
        if (
          i > 0 &&
          i < listTags.length &&
          listTags[i - 1].nativeElement.style.visibility === 'visible'
        ) {
          this.indexNeedReCheck = i - 1;
          this.contentToElementNeedReCheck = totalElementWidth;
        }
      }
      totalElementWidth =
        listTags[i].nativeElement.offsetWidth +
        listTags[i].nativeElement.offsetLeft;
    }
    this.changeDetechRef.detectChanges();
    this.reCheckTagElement();
    this.threedotWidth = this.moreElement
      ? this.moreElement.nativeElement.offsetWidth
      : 0;
  }

  private reCheckTagElement(): void {
    if (this.indexNeedReCheck <= 0) { return; }
    if (
      this.contentToElementNeedReCheck >
      this.tagBlock.nativeElement.offsetWidth - this.threedotWidth
    ) {
      this.tags.toArray()[
        this.indexNeedReCheck
      ].nativeElement.style.visibility = 'hidden';
      this.hideElements += 1;
      this.changeDetechRef.detectChanges();
    }
  }

  private initFormSearch(): void {
    this.searchControl = this.formBuilder.control('');
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      takeUntil(this.$destroy)
    ).subscribe((value: string) => {
      this.changeDetechRef.markForCheck();
      if (!value || this.group) {
        this.currentOptions = this.orginalOptions;
        return;
      }
      this.currentOptions = (this.orginalOptions as NameValueSelect[]).filter(option =>
        option.label.toUpperCase().includes(value.toUpperCase()));
    });
  }
}
