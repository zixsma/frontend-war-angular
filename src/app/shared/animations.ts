import { trigger, state, style, transition, animate } from '@angular/core';

/**
 * Shared Animation
 */

export const SlideInUpAnimation = trigger('slideInUp', [
  state('in', style({ transform: 'translateY(0)' })),
  transition('void => *', [
    style({ transform: 'translateY(100%)' }),
    animate(500)
  ])
]);
