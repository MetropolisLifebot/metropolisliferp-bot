import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("soporte")
  .setDescription("Explica cómo pedir ayuda al staff");

export async function execute(interaction) {
  await interaction.reply("🆘 Si necesitas ayuda, abre un ticket en el canal de soporte de nuestro Discord o contacta a un administrador.");
}
