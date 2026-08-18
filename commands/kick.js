const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("حذف رسائل")
        .addIntegerOption(option =>
            option
                .setName("amount")
                .setDescription("عدد الرسائل من 1 إلى 100")
                .setMinValue(1)
                .setMaxValue(100)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageMessages
        ),

    async execute(interaction) {
        const amount =
            interaction.options.getInteger("amount");

        const deleted =
            await interaction.channel.bulkDelete(
                amount,
                true
            );

        await interaction.reply({
            content: `🧹 تم حذف **${deleted.size}** رسالة.`,
            ephemeral: true
        });
    }
};
