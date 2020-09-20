import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { Component, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'lib-custom-dropdown',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `,
})
export class DropdownComponent {
  @Input()
  public reference: HTMLElement;

  @ViewChild(CdkPortal)
  public contentTemplate: CdkPortal;

  protected overlayRef: OverlayRef;

  public showing = false;

  constructor(protected overlay: Overlay) {}

  public show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.showing = true;
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.showing = false;
  }

  @HostListener('window:resize')
  public onWinResize(): void {
    this.syncWidth();
  }

  protected getOverlayConfig(): OverlayConfig {
    const currentPositionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.reference)
      .withPush(false)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);

    return new OverlayConfig({
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      positionStrategy: currentPositionStrategy,
    });
  }

  private syncWidth(): void {
    if (!this.overlayRef) {
      return;
    }

    const refRect = this.reference.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
