import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'lib-custom-dropdown',
  template: `
    <ng-template cdk-portal>
      <ng-content></ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnDestroy {
  @Input()
  public reference: HTMLElement;
  @Output()
  public eventClosed: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(CdkPortal)
  public contentTemplate: CdkPortal;

  protected overlayRef: OverlayRef;

  public showing = false;
  private destroy$: Subject<boolean> = new Subject();

  private windowResize$ = fromEvent(window, 'resize');

  constructor(protected overlay: Overlay) { }

  public show(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.windowResize$.pipe(takeUntil(this.destroy$)).subscribe(() => this.syncWidth());
    this.overlayRef.outsidePointerEvents().pipe(takeUntil(this.destroy$)).subscribe(() => this.hide());
    this.showing = true;
  }

  public hide(): void {
    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.showing = false;
    this.eventClosed.emit(true);
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
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
