import {
  bubble,
  listen,
  prevent_default,
  stop_propagation,
} from 'svelte/internal';

// Match modifiers on DOM events.
const modifierRegex = /^[a-z]+(?::(?:preventDefault|stopPropagation|passive|nonpassive|capture|once|self))+$/;

export function forwardEventsBuilder(component) {
  // This is our pseudo $on function. It is defined on component mount.
  let $on;
  // This is a list of events bound before mount.
  let events = [];
  // This is the original component $on function.
  const componentOn = component.$on;

  // And we override the $on function to forward all bound events.
  component.$on = (fullEventType, ...args) => {
    let eventType = fullEventType;
    let destructor = () => {};
    if ($on) {
      // The event was bound programmatically.
      destructor = $on(eventType);
    } else {
      // The event was bound before mount by Svelte.
      events.push(eventType);
    }
    const modifierMatch = eventType.match(modifierRegex);

    if (modifierMatch) {
      // Remove modifiers from the real event.
      const parts = eventType.split(':');
      eventType = parts[0];
    }

    // Call the original $on function.
    const componentDestructor = componentOn.call(component, eventType, ...args);

    return (...args) => {
      destructor();
      return componentDestructor(...args);
    };
  };

  function forward(e) {
    // Internally bubble the event up from Svelte components.
    bubble(component, e);
  }

  return (node) => {
    const destructors = [];

    // This function is responsible for forwarding all bound events.
    $on = (fullEventType) => {
      let eventType = fullEventType;
      let handler = forward;
      // DOM addEventListener options argument.
      let options = false;
      const modifierMatch = eventType.match(modifierRegex);
      if (modifierMatch) {
        // Parse the event modifiers.
        // Supported modifiers:
        // - preventDefault
        // - stopPropagation
        // - passive
        // - nonpassive
        // - capture
        // - once
        const parts = eventType.split(':');
        eventType = parts[0];
        options = Object.fromEntries(parts.slice(1).map((mod) => [mod, true]));
        if (options.nonpassive) {
          options.passive = false;
          delete options.nonpassive;
        }
        if (options.preventDefault) {
          handler = prevent_default(handler);
          delete options.preventDefault;
        }
        if (options.stopPropagation) {
          handler = stop_propagation(handler);
          delete options.stopPropagation;
        }
      }

      const off = listen(node, eventType, handler, options);
      const destructor = () => {
        off();
        const idx = destructors.indexOf(destructor);
        if (idx > -1) {
          destructors.splice(idx, 1);
        }
      };

      destructors.push(destructor);
      return destructor;
    };

    for (let i = 0; i < events.length; i++) {
      // Listen to all the events added before mount.
      $on(events[i]);
    }

    return {
      destroy: () => {
        // Remove all event listeners.
        for (let i = 0; i < destructors.length; i++) {
          destructors[i]();
        }
      },
    };
  };
}
