import type Component from './Graphic.svelte';

export declare class GraphicComponentDev extends Component {
  /**
   * @private
   * For type checking capabilities only.
   * Does not exist at runtime.
   * ### DO NOT USE!
   */
  $$prop_def: Omit<
    Partial<svelte.JSX.HTMLAttributes<HTMLSpanElement>>,
    keyof Component['$$prop_def']
  > &
    Component['$$prop_def'];
}
