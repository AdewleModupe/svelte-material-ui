import type { ComponentProps } from 'svelte';
import type { SmuiComponent } from '@smui/common';
import type Component from './Input.svelte';

export declare class InputComponentDev
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
    Partial<svelte.JSX.HTMLAttributes<HTMLInputElement>>,
    | 'use'
    | 'class'
    | 'type'
    | 'placeholder'
    | 'value'
    | 'files'
    | 'dirty'
    | 'invalid'
    | 'updateInvalid'
    | 'emptyValueNull'
    | 'emptyValueUndefined'
  > &
    ComponentProps<Component>;

  getElement(): ReturnType<Component['getElement']>;
}
