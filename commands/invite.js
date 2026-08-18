const {
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("إنشاء رابط دعوة للسيرفر"),

    async execute(interaction) {
        const invite =
            await interaction.channel.createInvite({
                maxAge: 86400,
                maxUses: 1,
                unique: true
            });

        await interaction.reply(
            `🔗 رابط الدعوة:\n${invite.url}`
        );
    }
};
