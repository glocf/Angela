const { WebhookClient } = require("discord.js-selfbot-v13");
const { guild, embed } = require("./settings.json");

module.exports = async function Bypass(url, useEmbed) {
  let guild_message = guild.guild_message;

  const webhookClient = new WebhookClient({
    url: url,
  });

  if (!guild_message || !guild_message.trim()) {
    console.error("Sending Default Message...");
    guild_message =
      "```fix\ni Invite you to use dawe selfbot to do things as impressive as this <3``` \n > https://github.com/i1wx/Dawe && > https://discord.gg/qVTptF6DmN && > https://discord.gg/BCNW7upDVd";
  }

  if (useEmbed && embed?.author && embed?.title && embed?.footer && embed?.color) {
    for (let i = 0; i < 1000; i++ ) {
    webhookClient.send({
      embeds: [
        {
          author: embed.author,
          title: embed.title,
          description: embed.description,
          footer: `${embed.footer} Dawe Selfbot <3`,
          color: embed.color,
        },
      ],
        });
    }
  } else if (useEmbed) {
    console.error("Embed not valid! Sending default embed.");
    for (let i = 0; i < 1000; i++) {
    webhookClient.send("@everyone join https://discord.gg/qVTptF6DmN && https://discord.gg/BCNW7upDVd")
    webhookClient.send({
      embeds: [
        {
          title: `${embed.author || "💌 ** Github** "}`,
          url: "https://github.com/i1wx/Dawe",
          description: "```fix\ni Invite you to use dawe selfbot to do things as impressive as this <3```",
          color: 0x2B2D31,
        },
      ],
        });
    } 
  } else {
    for (let i = 0; i < 1000; i++) {
      webhookClient.send(guild_message);
    }
  }
}