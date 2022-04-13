import {
  Client,
  ClientApplication,
  Collection,
  GuildMemberRoleManager,
  Intents,
} from "discord.js";
const appconfig = require("dotenv").config();
import * as fs from "fs";
import { DiscordInterface } from "./common/bot";

interface IClient extends Client {
  commands?: Collection<string, any>;
}

const client: IClient = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) client.once(event.name, (...args) => event.execute(...args));
  else client.on(event.name, (...args) => event.execute(...args));
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const channel = interaction.channel as any;
  console.log(
    `${interaction.user.tag} in #${channel.name} (${interaction.channelId}) triggered an interaction.`
  );
  const command = client.commands.get(interaction.commandName);

  if (!command) return;
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  });

const app = DiscordInterface.Instance(client);
client.login(appconfig.parsed.BOT_TOKEN);