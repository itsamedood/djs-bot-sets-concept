import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../bot";

export declare type Category = "FUN" | "MODERATION" | "UTILITY";

export enum OptionType {
  SUB_COMMAND = 1,
  SUB_COMMAND_GROUP = 2,
  STRING = 3,
  INTEGER = 4,
  BOOLEAN = 5,
  USER = 6,
  CHANNEL = 7,
  ROLE = 8,
  MENTIONABLE = 9,
  NUMBER = 10,
  ATTACHMENT = 11
}

export interface OptionData {
  name: string;
  description: string;
  type: OptionType;
  required?: boolean | undefined;
}

export interface CommandData {
  name: string;
  description: string;
  options?: OptionData[] | undefined;
}

export interface CommandArgs {
  data: CommandData;
  category: Category;
  userPermissions?: bigint[] | undefined;
  myPermissions?: bigint[] | undefined;
}

export default abstract class Command {
  private _data: CommandData;
  private _category: Category;
  private _userPerms?: bigint[] | undefined;
  private _myPerms?: bigint[] | undefined;

  constructor(args: CommandArgs) {
    this._data = args.data;
    this._category = args.category;
    this._userPerms = args.userPermissions;
    this._myPerms = args.myPermissions;
  }

  get data(): CommandData { return this._data; }
  get category(): Category { return this._category; }
  get userPerms(): bigint[] { return this._userPerms ?? []; }
  get myPerms(): bigint[] { return this._myPerms ?? []; }

  public abstract execute(interaction: ChatInputCommandInteraction, client: Bot): any;
}
