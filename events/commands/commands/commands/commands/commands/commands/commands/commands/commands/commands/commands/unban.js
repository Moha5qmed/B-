const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("إلغاء حظر عضو")
        .addStringOption(option =>
            option
                .setName("userid")
                .setDescription("ID العضو")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.BanMembers
        ),

    async execute(interaction) {
        const userId =
            interaction.options.getString("userid");

        try {
            await interaction.guild.members.unban(
                userId
            );

            await interaction.reply(
                `✅ تم إلغاء الحظر عن \`${userId}\`.`
            );
        } catch {
            await interaction.reply({
                content: "❌ لم أجد حظرًا لهذا الـID أو حدث خطأ.",
                ephemeral: true
            });
        }
    }
};
