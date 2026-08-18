const { Events } = require("discord.js");

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            return interaction.reply({
                content: "❌ هذا الأمر غير موجود.",
                ephemeral: true
            });
        }

        try {
            await command.execute(interaction, client);
        } catch (error) {
            console.error(error);

            const message = {
                content: "❌ حدث خطأ أثناء تنفيذ الأمر.",
                ephemeral: true
            };

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(message).catch(() => {});
            } else {
                await interaction.reply(message).catch(() => {});
            }
        }
    }
};
