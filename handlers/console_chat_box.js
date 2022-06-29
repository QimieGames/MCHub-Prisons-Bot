module.exports = {
    data: {
        name: 'console_chat_box'
    },
    async execute(consoleChatBoxInput, discordBot, ingameBot, isDiscordBotReady, isIngameBotReady){
        try {
            if(consoleChatBoxInput.startsWith('\\') === true){

                const internalCommandArgs = consoleChatBoxInput.slice(1).split(/ +/);
    
                const internalCommand = internalCommandArgs[0];
                
                switch(internalCommand){
                    default:
                        console.log('[MCHPB] Invalid Internal Command! Do \\help For List Of Commands.');
                        break;
                    case 'help':
                        console.log('[MCHPB] Internal Commands: help, restart, quit');
                        break;
                    case 'restart':
                        console.log('[MCHPB] Restarting the bot... ');
                        try{
                            discordBot.destroy();
                            ingameBot.end;
                            return isIngameBotReady = false, isDiscordBotReady = false, process.exit(0);
                        } catch {
                            console.log('[MCHPB] Error occured while restarting the bot properly!');
                            return isIngameBotReady = false, isDiscordBotReady = false, process.exit(0);
                        }
                        break;
                    case 'quit':
                        console.log('[MCHPB] Shutting the bot... ');
                        try{
                            discordBot.destroy();
                            ingameBot.end;
                            return isIngameBotReady = false, isDiscordBotReady = false, process.exit(1);
                        } catch {
                            console.log('[MCHPB] Error occured while shutting down the bot properly!');
                            return isIngameBotReady = false, isDiscordBotReady = false, process.exit(1);
                        }
                        break;
                }
            } else {
                try{

                    const emptyConsoleChatBoxInputRegex = new RegExp(/^([ ]+)$/, 'm');

                    if(consoleChatBoxInput === ''){
                        console.log('[MCHPB] Cannot send empty message!');
                    } else {
                        switch(emptyConsoleChatBoxInputRegex.test(consoleChatBoxInput)){
                            default:
                                console.log('[MCHPB] Error occured! Message was disregard.');
                                break;
                            case false:
                                ingameBot.chat(consoleChatBoxInput);
                                break;
                            case true:
                                console.log('[MCHPB] Cannot send empty message!');
                                break;
                        }
                    }
                } catch {
                    console.log('[MCHPB] Error occured while sending chat message! Restarting the bot...');
                    try{
                        discordBot.destroy();
                        ingameBot.end;
                        return isIngameBotReady = false, isDiscordBotReady = false, process.exit(0);
                    } catch {
                        console.log('[MCHPB] Error occured while restarting the bot properly!');
                        return isIngameBotReady = false, isDiscordBotReady = false, process.exit(0);
                    }
                }
            }
        } catch {
            console.log('[MCHPB] Error occured while executing console chat box handler! Restarting the bot...');
			try {
				discordBot.destroy();
				ingameBot.end;
				return isDiscordBotReady = false, isIngameBotReady = false, process.exit(0);
			} catch {
				console.log('[MCHPB] Error occured while restarting the bot properly!');
				return isDiscordBotReady = false, isIngameBotReady = false, process.exit(0);
			}
        }
    }
}