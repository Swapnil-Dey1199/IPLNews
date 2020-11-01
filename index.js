require('dotenv').config()
const Discord = require('discord.js')
const fs = require('fs')

const bot = new Discord.Client()
const token = process.env.TOKEN;
const prefix = '!';

bot.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)
    bot.commands.set(command.name,command)
}

bot.on('ready',()=>{
    console.log('Bot is online');
})


bot.on('message',msg=>{
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;
    const args = msg.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = bot.commands.get(commandName);
    if(command){
        command.execute(msg,args);
    }else{
        console.log('Wrong command')
    }
})

bot.login(token)