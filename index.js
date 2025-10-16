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
    "message"
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

