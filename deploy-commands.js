import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(foldersPath, file);
  const command = await import(`file://${filePath}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log("🔄 Cargando comandos...");
    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    console.log("✅ Comandos registrados.");
  } catch (error) {
    console.error(error);
  }
})();
