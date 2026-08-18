const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("إرسال رسالة باسم البوت")
        .addStringOption(option =>
            option
                .setName("message")
                .setDescription("الرسالة")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageMessages
        ),

    async execute(interaction) {
        const message =
            interaction.options.getString("message");

        await interaction.reply({
            content: "✅ تم إرسال الرسالة.",
            ephemeral: true
        });

        await interaction.channel.send(message);
    }
};
