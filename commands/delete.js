module.exports = {
    name: 'delete',
    description: 'delete messages in the channel',
    usage: "<number of messages to delete>",
    args: true,
    execute(message, args) {
        if (message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Library Technician')) {
            let amount = parseInt(args[0], 10);
            message.channel.bulkDelete(amount, true).catch(err => {
                console.error(err);
                message.channel.send('there was an error trying to prune messages in this channel!');
            });
          }
          else {
            message.channel.send('Insufficient Permission');
          }
        
    }
}
