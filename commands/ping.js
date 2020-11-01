module.exports = {
    name: 'ping',
    description: 'This command is used to check the status of your bot',
    execute(message,args){
        message.channel.send('🏏 Hey I am online! 😁')
         
    }
}