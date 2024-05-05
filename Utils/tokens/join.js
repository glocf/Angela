const axios = require("axios");

let baseURL = "https://discord.com/api/v9/"

module.exports = async function joiner(token, invite_code) {
    let result = false;
    this.headers2 = {
        join: {
          'Host': 'discord.com',
          'Connection': 'keep-alive',
          'sec-ch-ua': `"Chromium";v="92"`,
          
        },
       }
       this.headers = {
          info: {
            'Content-Type': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Safari/537.36',
            'Authorization': token
          },
         }
         if(!result) {
            const data = await axios.get(baseURL, { headers: this.headers.info });
            const joining = await axios.get(`${baseURL}/invites/${invite_code}?with_counts=true&with_expiration=true`, { headers: this.headers.info}).join
            console.log(data)
            return console.log("Tokens Suscefully Joined")
            result = true;
            return result;
        }
}