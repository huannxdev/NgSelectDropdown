import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSelectDropdownComponent } from './ng-select-dropdown.component';

describe('Select2Component', () => {
  let component: NgSelectDropdownComponent;
  let fixture: ComponentFixture<NgSelectDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgSelectDropdownComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgSelectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
