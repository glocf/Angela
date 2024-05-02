const { WebhookClient } = require("discord.js-selfbot-v13");
const { guild, embed } = require("./settings.json");

module.exports = async function Bypass(url, useEmbed) {
  let guild_message = guild.guild_message;

  const webhookClient = new WebhookClient({
    url: url,
  });

  webhookClient.edit({
    name: guild.webhooks_name || "Dawe Selfbot",
    avatar: guild.webhooks_avatar || "https://media.discordapp.net/attachments/1232793766323028140/1235237181287694336/e25c1104-b502-4bae-8194-5deb8fec4906.jpg?ex=66344c85&is=6632fb05&hm=0f50384a44ad667a9fc67e06bde330ea0323af3be8db30ec0d6a26a5fb29d085&=&format=webp",
  })

  if (!guild_message || !guild_message.trim()) {
    console.error("Sending Default Message...");
    guild_message =
      "@everyone ```fix\ni Invite you to use dawe selfbot to do things as impressive as this <3``` \n > https://github.com/i1wx/Dawe  \n\n > https://discord.gg/qVTptF6DmN  \n\n > https://discord.gg/kzcbFNenz3";
  }

  if (useEmbed && embed?.author && embed?.title && embed?.footer && embed?.color) {
    for (let i = 0; i < 1000; i++ ) {
    webhookClient.send("@everyone", guild_message)
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
    webhookClient.send("@everyone join https://discord.gg/qVTptF6DmN && https://discord.gg/kzcbFNenz3")
    webhookClient.send({
      embeds: [
        {
          title: `💌 ** Github** `,
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
