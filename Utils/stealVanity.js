const axios = require('axios');

const { token } = require("../config.json")

const vanitys = [
    "angela",
    "angelastealedvanity",
    "angelajdkjahsdjkad",
    "domadosporlapreventgang",
    "dkaslkdadjlka",
    "mdaslkdalkdsjd",
    "bypassedangela"
]

function randomVanity() {
    const randomIndex = Math.floor(Math.random() * vanitys.length);
    return vanitys[randomIndex];
}
module.exports = async function stealVanity(keepGuild, removeGuild, code) {
    try {
        const randomSelectedVanity = randomVanity();
        await axios.patch(`https://discord.com/api/v9/guilds/${removeGuild}/vanity-url`, { code: randomSelectedVanity }, {
            headers: {
              'Authorization': token,
              'Content-Type': 'application/json'
                }
            })
    } catch (err) {
        console.error('Unsuccessful remove vanity attempt', err);
  }
  await new Promise(resolve => setTimeout(resolve, 150));
  try {
    await axios.patch(`https://discord.com/api/v9/guilds/${keepGuild}/vanity-url`, { code: code }, {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      });
      console.log('Successful put vanity attempt');
    } catch (err) {
      console.error('Unsuccessful put vanity attempt', err);
    }
    await new Promise(resolve => setTimeout(resolve, 12000));
  }