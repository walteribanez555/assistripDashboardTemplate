import { trigger, state, style, animate, transition } from '@angular/animations';


export const ExpandDown = trigger('toggleDetails', [
      state('hide', style({ height: '0', opacity: 0 })),
      state('show', style({ height: 'fit-content', opacity: 1 })),
      transition('hide <=> show', animate('300ms ease-in-out'))
]);
