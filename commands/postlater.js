module.exports = {
    name: 'postlater',
    description: 'Post a message at a later time',
    args: true,
    extraperms: true,
    usage: '<delay in mins> <delay in hours> <delay in days> <#channel> <message>',
    execute(message, args, client) {
        if (message.member.roles.cache.some(role => role.name === 'Admin' || role.name === 'Library Technician')) {
            //delete the command message
        message.channel.bulkDelete(1, true).catch(err => {
            console.error(err);
        });
        //declare variables for init msg
        let delayStrMin = args[0];
        let delayStrHr = args[1];
        let delayStrDay = args[2];
        let destination = args[3];

        //convert delayStr to int
        delayMin = parseInt(delayStrMin, 10);
        delayHr = parseInt(delayStrHr, 10);
        delayDay = parseInt(delayStrDay, 10);

        //send command init msg
        message
            .reply(`Alright, I will post your message in channel ${destination} in ${delayMin} minute/s, ${delayHr} hour/s, ${delayDay} day/s`)
            .then(msg => msg.delete({ timeout: 5000 })
            .catch(console.error));
            
        delayMin = delayMin * 60000;
        delayHr = delayHr * 3600000;
        delayDay = delayDay * 86400000;

        let delay = delayMin + delayHr + delayDay;

        //remove delayMin int from args[0]
        args.shift();

        //remove delayHr int from args[0]
        args.shift();

        //remove delayDay int from args[0]
        args.shift();

        destination = args[0];
        //remove destination from args[0]
        args.shift();

        //slice destination so that it's only the channel id itself
        destination = destination.slice(2, -1);

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