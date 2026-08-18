const { Events } = require("discord.js");

module.exports = {
    name: Events.ClientReady,
    once: true,

    execute(client) {
        console.log("=================================");
        console.log(`🤖 Bot: ${client.user.tag}`);
        console.log(`🆔 ID: ${client.user.id}`);
        console.log(`🌐 Servers: ${client.guilds.cache.size}`);
        console.log("✅ البوت يعمل بنجاح!");
        console.log("=================================");

        client.user.setPresence({
            activities: [
                {
                    name: "80+ Commands",
                    type: 3
                }
            ],
            status: "online"
        });
    }
};
