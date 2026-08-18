const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("serverinfo")
        .setDescription("عرض معلومات السيرفر"),

    async execute(interaction) {
        const guild = interaction.guild;

        const embed = new EmbedBuilder()
            .setTitle(`🌐 ${guild.name}`)
            .setThumbnail(guild.iconURL())
            .addFields(
                {
                    name: "🆔 ID",
                    value: guild.id
                },
                {
                    name: "👥 الأعضاء",
                    value: `${guild.memberCount}`
                },
                {
                    name: "💬 الرومات",
                    value: `${guild.channels.cache.size}`
                },
                {
                    name: "🎭 الرتب",
                    value: `${guild.roles.cache.size}`
                },
                {
                    name: "👑 المالك",
                    value: `<@${guild.ownerId}>`
                }
            )
            .setColor("Blue");

        await interaction.reply({
            embeds: [embed]
        });
    }
};
