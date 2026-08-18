const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("حظر عضو")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("العضو")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("سبب الحظر")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.BanMembers
        ),

    async execute(interaction) {
        const user =
            interaction.options.getUser("user");

        const reason =
            interaction.options.getString("reason") ||
            "لم يتم تحديد سبب";

        const member =
            await interaction.guild.members
                .fetch(user.id)
                .catch(() => null);

        if (member && !member.bannable) {
            return interaction.reply({
                content: "❌ لا أستطيع حظر هذا العضو.",
                ephemeral: true
            });
        }

        await interaction.guild.members.ban(
            user.id,
            {
                reason
            }
        );

        await interaction.reply(
            `🔨 تم حظر **${user.tag}**\nالسبب: ${reason}`
        );
    }
};
