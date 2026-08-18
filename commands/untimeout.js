const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("untimeout")
        .setDescription("إزالة Timeout من عضو")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("العضو")
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ModerateMembers
        ),

    async execute(interaction) {
        const user =
            interaction.options.getUser("user");

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

        await member.timeout(null);

        await interaction.reply(
            `🔊 تم إزالة Timeout عن **${user.tag}**.`
        );
    }
};
