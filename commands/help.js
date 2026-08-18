const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("عرض أوامر البوت"),

    async execute(interaction, client) {
        const commands = client.commands
            .map(command => `</${command.data.name}:0>`)
            .join("\n");

        const embed = new EmbedBuilder()
            .setTitle("📚 قائمة الأوامر")
            .setDescription(commands || "لا توجد أوامر.")
            .setColor("Blue")
            .setFooter({
                text: `عدد الأوامر: ${client.commands.size}`
            });

        await interaction.reply({
            embeds: [embed]
        });
    }
};
