module.exports = {
  name: 'quebrar',
  description: 'qubrar a un care´ verga',
  options: [
    {
      name: 'user',
      type: 6, //USER Type
      description: 'The user you want to ban',
      required: true,
    },
  ],
  execute(interaction, client) {
    const member = interaction.options.get('user').value;

    if (!member) {
      return message.reply('Dime el nombre del vale que toca quebrar papi, que no hago milagros');
    }

    if (!interaction.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("No puedo quebrar al patrón.");
    }

    const userinfo = client.users.cache.get(member);

    return interaction.guild.members
      .ban(member)
      .then(() => {
        interaction.reply({
          content: `${userinfo.username} quebrado ese care´ monda.`,
          ephemeral: true,
        });
      })
      .catch(error =>
        interaction.reply({
          content: `Jodaaaaa se me escapó ese maricón.`,
          ephemeral: true,
        }),
      );
  },
};
