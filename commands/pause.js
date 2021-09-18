const {GuildMember} = require('discord.js');

module.exports = {
  name: 'pausa',
  description: 'Un descansito que se acaba el perico',
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
    const success = queue.setPaused(true);
    return void interaction.followUp({
      content: success ? '⏸ | me quedé sin perico, vuelvo cunado tengan más' : '❌ | ¡Se reventó esa caga!',
    });
  },
};
