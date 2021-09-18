const {GuildMember} = require('discord.js');

module.exports = {
  name: 'para',
  description: 'Para la guachafita',
  async execute(interaction, player) {
    if (!(interaction.member instanceof GuildMember) || !interaction.member.voice.channel) {
      return void interaction.reply({
        content: '¡No escucho un jopo!',
        ephemeral: true,
      });
    }

    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !== interaction.guild.me.voice.channelId
    ) {
      return void interaction.reply({
        content: '¡Vente pa´ aca que está la gozadera!',
        ephemeral: true,
      });
    }

    await interaction.deferReply();
    const queue = player.getQueue(interaction.guildId);
    if (!queue || !queue.playing)
      return void interaction.followUp({
        content: '❌ | ¡No está sonando ni verga!',
      });
    queue.destroy();
    return void interaction.followUp({content: '🛑 | ¡Me voy, que ya no tienen más perico, eso es cotopla!'});
  },
};
