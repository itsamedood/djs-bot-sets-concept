import { Client, Collection, REST, type ClientOptions, Routes } from "discord.js";
import { glob } from "glob";
import type Command from "./types/command";
import type Set from "./types/set";

export default class Bot extends Client {
  public readonly sets: Set[] = [];
  public readonly commands = new Collection<string, any>();
  public readonly buttons = new Collection<string, any>();
  public readonly selectMenus = new Collection<string, any>();
  public readonly modals = new Collection<string, any>();

  private readonly _cmdsJson: any[] = [];

  constructor(options: ClientOptions) { super(options); }

  public async readSets(): Promise<Set[]> {
    const files = await glob(`${import.meta.dir}/commands/**/*.ts`, { absolute: true });

    for (const file of files) {
      const { default: _set } = await import(file);
      const set: Set = _set;

      this.sets.push(set);
    }

    return this.sets;
  }

  public async registerCommands(): Promise<void> {
    for (const set of this.sets) {
      const command: Command = set.command;

      this.commands.set(command.data.name, command);
      this._cmdsJson.push(command.data);

      console.log(`Loaded ${command.data.name} command!`);
    }

    const clientId = process.env["CLIENT_ID"] ?? '';
    const rest = new REST({ version: '9' }).setToken(process.env["TOKEN"] ?? '');

    (async (): Promise<void> => {
      try {
        console.log(`Refreshing ${this.sets.length} application commands.`);

        const data: any = await rest.put(
          Routes.applicationCommands(clientId),
          { body: this._cmdsJson }
        );

        return console.log(`Successfully reloaded ${data.length} application commands!`);

      } catch (err) {
        console.log("Failed to reload application commands.");
        return console.error(err);
      }
    })();
  }
}
