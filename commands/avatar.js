const {
    SlashCommandBuilder,
    EmbedBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("avatar")
        .setDescription("عرض صورة عضو")
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

        const embed = new EmbedBuilder()
            .setTitle(`🖼️ Avatar - ${user.username}`)
            .setImage(user.displayAvatarURL({
                size: 1024,
                extension: "png"
            }))
            .setColor("Blue");

        await interaction.reply({
            embeds: [embed]
        });
    }
};
