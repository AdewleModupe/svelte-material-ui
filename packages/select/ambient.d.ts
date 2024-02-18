declare namespace svelte.JSX {
  interface HTMLAttributes<T> {}

  interface HTMLProps<T extends EventTarget> extends HTMLAttributes<T> {
    ['onSMUISelectLeadingIcon:mount']?: (
      event: CustomEvent<any> & { target: T }
    ) => any;
    ['onSMUISelectLeadingIcon:unmount']?: (
      event: CustomEvent<any> & { target: T }
    ) => any;
  }
}

declare module '*.svelte' {
  export { SvelteComponentDev as default } from 'svelte/internal';
}
