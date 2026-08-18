const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("إدارة رتبة عضو")
        .addSubcommand(sub =>
            sub
                .setName("add")
                .setDescription("إضافة رتبة")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("العضو")
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option
                        .setName("role")
                        .setDescription("الرتبة")
                        .setRequired(true)
                )
        )
        .addSubcommand(sub =>
            sub
                .setName("remove")
                .setDescription("إزالة رتبة")
                .addUserOption(option =>
                    option
                        .setName("user")
                        .setDescription("العضو")
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option
                        .setName("role")
                        .setDescription("الرتبة")
                        .setRequired(true)
                )
        )
        .setDefaultMemberPermissions(
            PermissionFlagsBits.ManageRoles
        ),

    async execute(interaction) {
        const subcommand =
            interaction.options.getSubcommand();

        const user =
            interaction.options.getUser("user");

        const role =
            interaction.options.getRole("role");

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

        if (role.managed) {
            return interaction.reply({
                content: "❌ لا يمكن إدارة هذه الرتبة.",
                ephemeral: true
            });
        }

        if (role.position >= interaction.guild.members.me.roles.highest.position) {
            return interaction.reply({
                content: "❌ هذه الرتبة أعلى من رتبة البوت.",
                ephemeral: true
            });
        }

        if (subcommand === "add") {
            await member.roles.add(role);

            return interaction.reply(
                `✅ تمت إضافة رتبة **${role.name}** إلى **${user.tag}**.`
            );
        }

        if (subcommand === "remove") {
            await member.roles.remove(role);

            return interaction.reply(
                `✅ تمت إزالة رتبة **${role.name}** من **${user.tag}**.`
            );
        }
    }
};
