const fs = require('fs');

module.exports = {
  name: 'ayuda',
  description: 'Listar todos los comandos para invocar al cacique.',
  execute(interaction) {
    let str = '';
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./${file}`);
      str += `Nombre: ${command.name}, Descripción: ${command.description} \n`;
    }

    return void interaction.reply({
      content: str,
      ephemeral: true,
    });
  },
};
