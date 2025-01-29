import type { ComponentProps } from 'svelte';
import type { SmuiComponent } from '@smui/common';
import type Component from './Pagination.svelte';

export declare class PaginationComponentDev
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
    'use' | 'class'
  > & {
    [k in keyof Partial<
      svelte.JSX.HTMLAttributes<HTMLDivElement>
    > as `trailing\$${k}`]?: Partial<
      svelte.JSX.HTMLAttributes<HTMLDivElement>
    >[k];
  } & ComponentProps<Component>;

  getElement(): ReturnType<Component['getElement']>;
}
