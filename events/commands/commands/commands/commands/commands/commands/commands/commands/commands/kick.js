const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("طرد عضو من السيرفر")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("العضو")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("السبب")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.KickMembers
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

        if (!member) {
            return interaction.reply({
                content: "❌ العضو غير موجود.",
                ephemeral: true
            });
        }

        if (!member.kickable) {
            return interaction.reply({
                content: "❌ لا أستطيع طرد هذا العضو.",
                ephemeral: true
            });
        }

        await member.kick(reason);

        await interaction.reply(
            `👢 تم طرد **${user.tag}**\nالسبب: ${reason}`
        );
    }
};
