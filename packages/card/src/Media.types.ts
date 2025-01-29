import type { ComponentProps } from 'svelte';
import type { SmuiComponent } from '@smui/common';
import type Component from './Media.svelte';

export declare class MediaComponentDev
  extends Component
  implements SmuiComponent
{
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$prop_def: Omit<
    Partial<svelte.JSX.HTMLAttributes<HTMLDivElement>>,
    'use' | 'class' | 'aspectRatio'
  > &
    ComponentProps<Component>;

  getElement(): ReturnType<Component['getElement']>;
}
