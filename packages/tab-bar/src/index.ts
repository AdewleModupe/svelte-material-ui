import type { ComponentType } from 'svelte';

import TabBar from './TabBar.svelte';
import type { TabBarComponentDev } from './TabBar.types.js';
export * from './TabBar.types.js';

export default TabBar as ComponentType<TabBarComponentDev>;
