import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { DropdownService } from './providers/dropdown.service';
import { MultiSelectOptionComponent } from './components/multi-select-option/multi-select-option.component';
import { NgSelectDropdownComponent } from './components/ng-select-dropdown.component';
import { SingleSelectContainerComponent } from './components/single-select-container/single-select-container.component';
import { FormatIdStringPipe } from './pipe/formatIdString.pipe';

@NgModule({
  declarations: [
    NgSelectDropdownComponent,
    MultiSelectOptionComponent,
    DropdownComponent,
    SingleSelectContainerComponent,
    FormatIdStringPipe
  ],
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DropdownService
   ],
  exports: [NgSelectDropdownComponent],
})
export class NgSelectDropdownModule {}
