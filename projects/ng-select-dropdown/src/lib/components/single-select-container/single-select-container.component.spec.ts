import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleSelectContainerComponent } from './single-select-container.component';

describe('SingleSelectContainerComponent', () => {
  let component: SingleSelectContainerComponent;
  let fixture: ComponentFixture<SingleSelectContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SingleSelectContainerComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(SingleSelectContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
