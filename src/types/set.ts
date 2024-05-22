import type Command from "./command";

/**
 * Holds the command, and any components attached to it.
 */
export default interface Set {
  command: Command;
  buttons: any[];
  menus: any[];
  modals: any[];
}
