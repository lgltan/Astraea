module.exports = {
    name: 'postlater',
    description: 'Post a message at a later time',
    args: true,
    extraperms: true,
    usage: '<delay in mins> <#channel> <message>',
    execute(message, args, client) {
        if (message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Library Technician')) {
            //delete the command message
        message.channel.bulkDelete(1, true).catch(err => {
            console.error(err);
        });

        //declare variables for init msg
        let delayStr = args[0];
        let destination = args[1];

        //convert delayStr to int
        delay = parseInt(delayStr, 10);

        //send command init msg
        message
            .reply(`Alright, I will post your message in channel ${destination} in ${delay} minute/s`)
            .then(msg => msg.delete({ timeout: 5000 })
            .catch(console.error));
        delay = delay * 60000;

        //remove delay int from args[0]
        args.shift();

        destination = args[0];
        //remove destination from args[0]
        args.shift();

        //slice destination so that it's only the channel id itself
        destination = destination.slice(2, -1);

        // const channel = client.channels.cache.get(`${destination}`);
        const channel = client.channels.cache.get(destination);
        if(channel) {
            setTimeout(
                () => {
                    channel.send(args.join(' '))
                }
            , delay);
        }
    }       
        else {
            message.channel.send('Insufficient Permission');
        }
        
}
}