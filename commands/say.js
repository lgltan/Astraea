module.exports = {
    name: 'say',
    description: 'Say a message',
    usage: "<message>",
    args: true,
    cooldown: 3,
    execute(message, args) {    
        if (message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Library Technician' || role.name === 'Librarians')) {
            message.channel.bulkDelete(1, true).catch(err => {
                console.error(err);
            });
            message.channel.send(args.join(' '));
          }
          else {
            message.channel.send('Insufficient Permission');
          }
        
    }
}