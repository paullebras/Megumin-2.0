module.exports = {
    name: 'ping',
    description: 'this is a ping command.',
    execute(message, args) {


        message.channel.send(`${message.author/* .username */}, le Destin nous a réunis !`);


        // To mention a specific role:

        /* const roleName = 'Connard de Grammar Nazi'
        const roleId = '466892791243603968'
        message.channel.send(`${message.guild.roles.cache.find(element => (element.name.includes(roleName)) || element.id.includes(roleId))}`); */

    }
}
