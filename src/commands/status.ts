import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, MessageEmbed } from "discord.js";
import { API_Status } from "../models/api-status";
import { statusGetStatus } from "../repositories/status-repository";

export const data = new SlashCommandBuilder()
  .setName("api-status")
  .setDescription("Gets the status of the TBA API");
export async function execute(interaction: CommandInteraction) {

  const status = await statusGetStatus() as API_Status;
  const embed = new MessageEmbed({
    footer: { text: Date.now().toString() },
    title: "API Status",
    timestamp: Date.now().toString(),
    fields: [{
        name: "Status",
        value: `\`\`\`json\n${JSON.stringify(status, null, 2)}\`\`\``,
    }],
  });

  try {
    interaction.reply({embeds: [embed], fetchReply: true});
  } catch (e) {
    console.log(e);
  }
}
