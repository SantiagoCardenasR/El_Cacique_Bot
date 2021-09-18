const fs = require('fs');
const {Client, Intents, Collection} = require('discord.js');
const {token} = require('./config.json');
const {Player} = require('discord-player');

const client = new Client({
    intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS],
  });
client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

console.log(client.commands);

const player = new Player(client);

player.on('error', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the queue: ${error.message}`);
});

player.on('connectionError', (queue, error) => {
  console.log(`[${queue.guild.name}] Error emitted from the connection: ${error.message}`);
});

player.on('trackStart', (queue, track) => {
  queue.metadata.send(`🎶 | ¡Empezó a sonar esta monda mi vale: **${track.title}** en el canal **${queue.connection.channel.name}**!`);
});

player.on('trackAdd', (queue, track) => {
  queue.metadata.send(`🎶 | ¡Ya metí **${track.title}** en la cola de la gozadera!`);
});

player.on('botDisconnect', queue => {
  queue.metadata.send('❌ | ¡Me echaron de esta verga, Ya estoy limpiando el verguero!');
});

player.on('channelEmpty', queue => {
  queue.metadata.send('❌ | No hay un culo en esta monda, me largo nojoda...');
});

player.on('queueEnd', queue => {
  queue.metadata.send('✅ | ¡Se acabó la guachafita!');
});

client.once('ready', async () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || !message.guild) return;
  if (!client.application?.owner) await client.application?.fetch();

  if (message.content === "!deploy" && message.author.id === client.application?.owner?.id) {
      await message.guild.commands.set(client.commands).then(() => {
        message.reply("Deployed!");
      })
      .catch((err) => {
        message.reply("Could not deploy commands! Make sure the bot has the application.commands permission!");
        console.error(err)
      });
  }
});

client.on('interactionCreate', async interaction => {
  const command = client.commands.get(interaction.commandName.toLowerCase());

  try {
    if (interaction.commandName == 'ban' || interaction.commandName == 'userinfo') {
      command.execute(interaction, client);
    } else {
      command.execute(interaction, player);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'There was an error trying to execute that command!',
    });
  }
});

client.login(token);