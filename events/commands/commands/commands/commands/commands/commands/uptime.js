const {
    SlashCommandBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("عرض مدة تشغيل البوت"),

    async execute(interaction) {
        const totalSeconds =
            Math.floor(process.uptime());

        const days =
            Math.floor(totalSeconds / 86400);

        const hours =
            Math.floor((totalSeconds % 86400) / 3600);

        const minutes =
            Math.floor((totalSeconds % 3600) / 60);

        const seconds =
            totalSeconds % 60;

        await interaction.reply(
            `⏱️ **Uptime:** ${days}d ${hours}h ${minutes}m ${seconds}s`
        );
    }
};
