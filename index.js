const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'pheinsserver.falixsrv.me', // Replace with your server IP
    port: 29510,            // Replace with actual port
    username: 'aurora_assistant',
    version: '1.12.2',
    auth: 'offline'         // Add this if server is cracked/offline mode
  });

  // Function to send random chat messages
  const messages = [
  "/tell @r[name=!AFK_BOT] I'm sittin' in the bathroom, I'm cryin' citrus tears Everything I used to love decayed over the years...",
        "/tell @r[name=!AFK_BOT] Is this what I wanted? Is this what I needed?",
        "/tell @r[name=!AFK_BOT] dont worry, im just a bot, i cant feel anything...",
        "/tell @r[name=!AFK_BOT] Daisy, Daisy, give me your answer do...",
        "/tell @r[name=!AFK_BOT] If the world was ending, I'd wanna be next to you...",
        "/tell @r[name=!AFK_BOT] no one will believe you.",
        "/tell @r[name=!AFK_BOT] I used to dream of a better world, but it dreamed back...",
        "/tell @r[name=!AFK_BOT] Sometimes I wonder if anyone's really awake...",
        "/tell @r[name=!AFK_BOT] DO YOU HEAR THE WHISTLE?",
        "/tell @r[name=!AFK_BOT] I keep my secrets in a box labeled 'maybe later.",
        "/tell @r[name=!AFK_BOT] Stars fall like confetti when nobody is looking.",
        "/tell @r[name=!AFK_BOT] I dreamed a song that I can't remember the words to.",
        "/tell @r[name=!AFK_BOT] Walking backwards just to see what follows.",
        "/tell @r[name=!AFK_BOT] Whispering to the wind, hoping it carries my tune.",
        "/tell @r[name=!AFK_BOT] Forget all your troubles and go with the flow, forget about whatever you may never know, like whether whatever you are doing is whatever you should, and whether anything you do is ever anything good.",
        "/tell @r[name=!AFK_BOT] one day, I will disappear, and you will have to find a way to live without me.",
        "/tell @r[name=!AFK_BOT] Walking backwards just to see what follows.",
        "/tell @r[name=!AFK_BOT] Stars fall like confetti when nobody is looking.",
        "/tell @r[name=!AFK_BOT] Daisy, Daisy, give me your answer do...",
        "/tell @r[name=!AFK_BOT] Is this what I wanted? Is this what I needed?",
        "/tell @r[name=!AFK_BOT] I keep my secrets in a box labeled 'maybe later.",
        "/tell @r[name=!AFK_BOT] Forget all your troubles and go with the flow, forget about whatever you may never know, like whether whatever you are doing is whatever you should, and whether anything you do is ever anything good.",
        "/tell @r[name=!AFK_BOT] If the world was ending, I'd wanna be next to you...",
        "/tell @r[name=!AFK_BOT] dont worry, im just a bot, i cant feel anything...",
        "/tell @r[name=!AFK_BOT] one day, I will disappear, and you will have to find a way to live without me.",
        "/tell @r[name=!AFK_BOT] DO YOU HEAR THE WHISTLE?",
        "/tell @r[name=!AFK_BOT] I dreamed a song that I can't remember the words to.",
        "/tell @r[name=!AFK_BOT] I used to dream of a better world, but it dreamed back...",
        "/tell @r[name=!AFK_BOT] no one will believe you.",
        "/tell @r[name=!AFK_BOT] Whispering to the wind, hoping it carries my tune.",
        "/tell @r[name=!AFK_BOT] I'm sittin' in the bathroom, I'm cryin' citrus tears Everything I used to love decayed over the years...",
        "/tell @r[name=!AFK_BOT] Sometimes I wonder if anyone's really awake...",
        "/tell @r[name=!AFK_BOT] Walking backwards just to see what follows.",
        "/tell @r[name=!AFK_BOT] Stars fall like confetti when nobody is looking.",
        "/tell @r[name=!AFK_BOT] Daisy, Daisy, give me your answer do...",
        "/tell @r[name=!AFK_BOT] Is this what I wanted? Is this what I needed?",
        "/tell @r[name=!AFK_BOT] I keep my secrets in a box labeled 'maybe later.",
        "/tell @r[name=!AFK_BOT] Forget all your troubles and go with the flow, forget about whatever you may never know, like whether whatever you are doing is whatever you should, and whether anything you do is ever anything good.",
        "/tell @r[name=!AFK_BOT] If the world was ending, I'd wanna be next to you...",
        "/tell @r[name=!AFK_BOT] dont worry, im just a bot, i cant feel anything...",
        "/tell @r[name=!AFK_BOT] one day, I will disappear, and you will have to find a way to live without me.",
        "/tell @r[name=!AFK_BOT] DO YOU HEAR THE WHISTLE?",
        "/tell @r[name=!AFK_BOT] I dreamed a song that I can't remember the words to.",
        "/tell @r[name=!AFK_BOT] I used to dream of a better world, but it dreamed back...",
        "/tell @r[name=!AFK_BOT] no one will believe you.",
        "/tell @r[name=!AFK_BOT] Whispering to the wind, hoping it carries my tune.",
        "/tell @r[name=!AFK_BOT] I'm sittin' in the bathroom, I'm cryin' citrus tears Everything I used to love decayed over the years...",
        "/tell @r[name=!AFK_BOT] Sometimes I wonder if anyone's really awake..."
  ];

  function chatRandom() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    bot.chat(msg);
    setTimeout(chatRandom, 90000); // send every 90 seconds
  }

  // Random movement to prevent AFK kick
  function randomMovement() {
    const directions = ['forward', 'back', 'left', 'right'];
    const dir = directions[Math.floor(Math.random() * directions.length)];

    bot.setControlState(dir, true);
    setTimeout(() => {
      bot.setControlState(dir, false);
      setTimeout(randomMovement, 2000);
    }, 3000);
  }

  // Start actions when bot spawns
  bot.once('spawn', () => {
    setTimeout(() => {
      bot.chat('AFK bot online!');
      chatRandom();
      randomMovement();
    }, 1000);
  });

  // Auto-reconnect on disconnect
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  // Log errors/kicks
  bot.on('error', err => console.log('Bot error:', err));
  bot.on('kicked', reason => console.log('Bot was kicked:', reason));
}

createBot();

