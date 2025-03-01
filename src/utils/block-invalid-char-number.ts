import type { KeyboardEvent } from 'react';

export const blockInvalidChar = (e: KeyboardEvent<HTMLInputElement>): false | void =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();
