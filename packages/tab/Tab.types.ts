import type { TabIndicatorComponentDev } from '@smui/tab-indicator';
import type { SMUIComponent } from '@smui/common';
import type Component from './Tab.svelte';
import type { ButtonComponentDev as ButtonElementComponentDev } from '@smui/common/elements';

export declare class TabComponentDev<
  C extends SMUIComponent = ButtonElementComponentDev
> extends Component {
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$prop_def: Omit<
    Partial<svelte.JSX.HTMLAttributes<ReturnType<C['getElement']>>>,
    keyof Component['$$prop_def']
  > &
    {
      [k in keyof Partial<
        svelte.JSX.HTMLAttributes<HTMLSpanElement>
      > as `content\$${k}`]?: Partial<
        svelte.JSX.HTMLAttributes<HTMLSpanElement>
      >[k];
    } &
    {
      [k in keyof TabIndicatorComponentDev['$$prop_def'] as `tabIndicator\$${k}`]?: TabIndicatorComponentDev['$$prop_def'][k];
    } &
    Component['$$prop_def'];
}

import type { MDCTabDimensions } from '@material/tab';

export interface SMUITabAccessor {
  tabId: any;
  readonly element: HTMLElement;
  readonly active: boolean;
  forceAccessible(accessible: boolean): void;
  computeIndicatorClientRect(): DOMRect;
  computeDimensions(): MDCTabDimensions;
  focus(): void;
  activate(
    previousIndicatorClientRect: DOMRect | undefined,
    skipFocus: boolean
  ): void;
  deactivate(): void;
}
