# Project Dawe Selfbot

This project utilizes Discord.js v13 to perform various automated tasks on a Discord server. Here are the implemented features and how to use them:

## Features
- [x] Timeout for all guild members: Imposes a 7-day timeout on all guild members.
- [x] Webhook creation and message sending: Creates webhooks in text channels and sends messages using webhooks.
- [x] Ban all members: Bans all server members.
- [x] Remove all members: Removes all server members.
- [x] Create administrator role: Creates a role with administrator permissions and assigns it to the user who executes the command.
- [x] Grant administrator permissions to everyone: Grants administrator permissions to the "@everyone" role on the server.
- [x] Initiate a raid: Creates a channel, sends multiple messages with an embed, and mentions "@everyone".

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.

## Configuration
Fill in the necessary information in `config.json` and `settings.json`.

## Execution
1. Run the selfbot with `npm start`.
2. Use the available commands in Discord to activate features:
   - `,banall`: Bans all server members.
   - `,kickall`: Removes all server members.
   - `,admin`: Creates an administrator role and assigns it to the user.
   - `,everyone`: Grants administrator permissions to the "@everyone" role.
   - `,raid`: Initiates a raid on the server.