import { ChatInputCommandInteraction } from "discord.js";
import Bot from "../../bot";
import Command from "../../types/command";

class PingCommand extends Command {
  constructor() {
    super({
      data: {
        name: "ping",
        description: "Pong!"
      },
      category: "UTILITY"
    });
  }

  public async execute(interaction: ChatInputCommandInteraction, client: Bot) {
    return await interaction.reply("🏓 Pong!");
  }
}

export default {
  command: new PingCommand(),
  buttons: [],
  menus: [],
  modals: [],
};
