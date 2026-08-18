const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("botinfo")
        .setDescription("عرض معلومات البوت"),

    async execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("🤖 معلومات البوت")
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                {
                    name: "اسم البوت",
                    value: client.user.tag
                },
                {
                    name: "🆔 ID",
                    value: client.user.id
                },
                {
                    name: "🌐 السيرفرات",
                    value: `${client.guilds.cache.size}`
                },
                {
                    name: "📚 الأوامر",
                    value: `${client.commands.size}`
                },
                {
                    name: "🏓 Ping",
                    value: `${client.ws.ping}ms`
                }
            )
            .setColor("Blue");

        await interaction.reply({
            embeds: [embed]
        });
    }
};
