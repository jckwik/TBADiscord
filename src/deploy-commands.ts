import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
const appconfig = require("dotenv").config();
import { resolve } from "path";
const { readdir } = require("fs").promises;

async function getFiles(dir: string) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

(async () => {
  const files = await getFiles("./commands");
  const commandFiles = files.filter((file) => file.endsWith(".js"));
  const commands = [];

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
  }
  const rest = new REST({ version: "9" }).setToken(appconfig.parsed.BOT_TOKEN);
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        appconfig.parsed.clientId,
        appconfig.parsed.guildId
      ),
      {
        body: commands,
      }
    );

    console.log("Successfully registered application commands.");
  } catch (error) {
    console.error(error);
  }
})();
