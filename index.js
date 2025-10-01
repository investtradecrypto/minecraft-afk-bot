const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'eagler.anonynodes.in', // Replace with your server IP
    port: 26168,                      // Replace with actual port
    username: 'AFK_BOT',
    version: '1.12.2',
    auth: 'offline'                   // Use 'microsoft' if the server is online-mode
  });

  // List of random chat messages
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
    "/tell @r[name=!AFK_BOT] Forget all your troubles and go with the flow, forget about whatever you may never know...",
    "/tell @r[name=!AFK_BOT] one day, I will disappear, and you will have to find a way to live without me."
  ];

  // Sends a random message every 5 minutes
  function chatRandom() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    bot.chat(msg);
    setTimeout(chatRandom, 300000); // 300000 ms = 5 minutes
  }

  // Continuous movement to avoid AFK
  function alwaysMove() {
    const directions = ['forward', 'back', 'left', 'right'];

    setInterval(() => {
      // Clear all movement
      directions.forEach(dir => bot.setControlState(dir, false));

      // Pick random direction
      const dir = directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(dir, true);

      // Randomly jump sometimes
      if (Math.random() < 0.3) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 3000); // change direction every 3s
  }

  // Start actions on spawn
  bot.once('spawn', () => {
    setTimeout(() => {
      bot.chat('AFK bot online!');
      chatRandom();
      alwaysMove();
    }, 1000);
  });

  // Auto-reconnect on disconnect
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  // Error + kick logging
  bot.on('error', err => console.log('Bot error:', err));
  bot.on('kicked', reason => console.log('Bot was kicked:', reason));
}

createBot();
