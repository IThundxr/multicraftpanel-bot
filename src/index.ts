import {
    Client,
    GatewayIntentBits,
    Partials,
    OAuth2Scopes,
    InteractionType,
    PermissionFlagsBits,
    ChannelType,
    Events,
} from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildModeration,
    ],
    partials: [Partials.Channel],
});

client.once('ready', async () => {
    console.log("Connected to Discord!");

    console.log(
		client.generateInvite({
                scopes: [OAuth2Scopes.Bot],
                permissions: [
                    PermissionFlagsBits.EmbedLinks,
                ],
            })
    );

    if (process.env.NODE_ENV !== 'development')
        console.warn(yellow(bold('Running in production mode!')));

    const mcVersion = await getLatestMinecraftVersion();
    client.user?.presence.set({
        activities: [{ name: `Minecraft ${mcVersion}` }],
        status: 'online',
    });


reuploadCommands()
    .then(() => {
        client.login(process.env.DISCORD_TOKEN);
    })
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
