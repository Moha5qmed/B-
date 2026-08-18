const { Events, ActivityType } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.log(``);
        console.log(`================================`);
        console.log(`🤖 Bot: ${client.user.tag}`);
        console.log(`🟢 Bot is online!`);
        console.log(`================================`);

        client.user.setPresence({
            activities: [
                {
                    name: `${client.guilds.cache.size} Servers`,
                    type: ActivityType.Watching
                }
            ],
            status: "online"
        });
    }
};
