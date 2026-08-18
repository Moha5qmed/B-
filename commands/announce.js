const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("announce")
        .setDescription("إرسال إعلان")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("نص الإعلان")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageGuild
        ),

    async execute(interaction) {
        const message =
            interaction.options.getString("message");

        const embed = new EmbedBuilder()
            .setTitle("📢 إعلان")
            .setDescription(message)
            .setFooter({
                text: `بواسطة ${interaction.user.tag}`
            })
            .setTimestamp()
            .setColor("Blue");

        await interaction.channel.send({
            embeds: [embed]
        });

        await interaction.reply({
            content: "✅ تم إرسال الإعلان.",
            ephemeral: true
        });
    }
};
