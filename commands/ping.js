module.exports = {
    name: 'ping',
    description: 'pong',
    cooldown: 10,
    execute(message, args) {
        //delete the command message
        message.channel.bulkDelete(1, true).catch(err => {
            console.error(err);
        });
        
        message.reply("pong!");
    }
}