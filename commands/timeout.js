const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("إعطاء Timeout لعضو")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("العضو")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName("minutes")
                .setDescription("المدة بالدقائق")
                .setMinValue(1)
                .setMaxValue(40320)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ModerateMembers
        ),

    async execute(interaction) {
        const user =
            interaction.options.getUser("user");

        const minutes =
            interaction.options.getInteger("minutes");

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

        if (!member.moderatable) {
            return interaction.reply({
                content: "❌ لا أستطيع إعطاء هذا العضو Timeout.",
                ephemeral: true
            });
        }

        await member.timeout(
            minutes * 60 * 1000,
            `Timeout بواسطة ${interaction.user.tag}`
        );

        await interaction.reply(
            `🔇 تم إعطاء **${user.tag}** Timeout لمدة **${minutes} دقيقة**.`
        );
    }
};
