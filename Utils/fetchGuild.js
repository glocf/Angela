const { Client } = require("discord.js-selfbot-v13");

const client = new Client({
    checkUpdate: false,
});

const { guild } = require("./settings.json");
const { guild_id } = guild;
const { token } = require("../config.json");

client.login(token);

module.exports = async function extrackGuild() {
    await client.ready;
    try {
        const guild = await client.guilds.fetch(guild_id);
        if(!guild) {
            console.log("Invalid Guild!")
            return;
        }
        return guild;
    } catch (error) {
        console.error("Errror to Obtain Guild!", error);
        return null;
    }
};