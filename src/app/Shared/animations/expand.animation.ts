import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

export const Expand = trigger('expandCartAnimation', [
  state('collapsed', style({
    height: '0px',
    opacity: '0',
    overflow: 'hidden'
  })),
  state('expanded', style({
    height: 'auto',
    opacity: '1',
    overflow: 'hidden'
  })),
  transition('collapsed => expanded', [
    animate('1s ease-out', keyframes([
      style({ height: '100px', opacity: '1', offset: 0 }),
      style({ height: 'auto', opacity: '1', offset: 1 })
    ]))
  ]),


]);
