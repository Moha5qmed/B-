const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("عرض معلومات عضو")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("العضو")
                .setRequired(false)
        ),

    async execute(interaction) {
        const user =
            interaction.options.getUser("user") ||
            interaction.user;

        const member = await interaction.guild.members
            .fetch(user.id)
            .catch(() => null);

        const embed = new EmbedBuilder()
            .setTitle(`👤 معلومات ${user.username}`)
            .setThumbnail(user.displayAvatarURL())
            .addFields(
                {
                    name: "🆔 ID",
                    value: user.id
                },
                {
                    name: "📅 إنشاء الحساب",
                    value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`
                },
                {
                    name: "🤖 Bot",
                    value: user.bot ? "نعم" : "لا"
                }
            )
            .setColor("Blue");

        if (member) {
            embed.addFields({
                name: "📅 دخول السيرفر",
                value: member.joinedTimestamp
                    ? `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`
                    : "غير معروف"
            });
        }

        await interaction.reply({
            embeds: [embed]
        });
    }
};
