module.exports = {
	name: 'ping',
    description: 'Ping!',
	args: false,
	team: false,
    usage: '[]',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};