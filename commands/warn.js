const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

const fs = require("fs");
const path = require("path");

const dataPath =
    path.join(__dirname, "../data/warnings.json");

function loadWarnings() {
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, "{}");
    }

    return JSON.parse(
        fs.readFileSync(dataPath, "utf8")
    );
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("تحذير عضو")
        .addUserOption(option =>
            option
                .setName("user")
                .setDescription("العضو")
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName("reason")
                .setDescription("سبب التحذير")
                .setRequired(false)
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ModerateMembers
        ),

    async execute(interaction) {
        const user =
            interaction.options.getUser("user");

        const reason =
            interaction.options.getString("reason") ||
            "لم يتم تحديد سبب";

        const warnings = loadWarnings();

        if (!warnings[interaction.guild.id]) {
            warnings[interaction.guild.id] = {};
        }

        if (!warnings[interaction.guild.id][user.id]) {
            warnings[interaction.guild.id][user.id] = [];
        }

        warnings[interaction.guild.id][user.id].push({
            moderator: interaction.user.id,
            reason,
            date: new Date().toISOString()
        });

        fs.writeFileSync(
            dataPath,
            JSON.stringify(warnings, null, 2)
        );

        const count =
            warnings[interaction.guild.id][user.id].length;

        await interaction.reply(
            `⚠️ تم تحذير **${user.tag}**\nالسبب: ${reason}\nعدد التحذيرات: **${count}**`
        );
    }
};
