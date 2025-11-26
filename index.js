const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: 'Pheinmanski.aternos.me', // Replace with your server IP
    port: 25854,                      // Replace with actual port
    username: 'AFK_BOT',
    version: '1.21.10',
    auth: 'offline'                   // Use 'microsoft' if the server is online-mode
  });

  // List of random chat messages
  const messages = [
    "/w AFK_BOT hi" // this messages itself, not impacting the actual chat
    ];

  // Sends random message every 5 minutes
  function chatRandom() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    bot.chat(msg);
    setTimeout(chatRandom, 300000); // 300000 ms = 5 minutes
  }
  function alwaysMove() {
    const directions = ['forward', 'back', 'left', 'right'];

    setInterval(() => {
      directions.forEach(dir => bot.setControlState(dir, false));

      // Pick random direction
      const dir = directions[Math.floor(Math.random() * directions.length)];
      bot.setControlState(dir, true);

      // random jumps, probably wont help tho
      if (Math.random() < 0.3) {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 500);
      }
    }, 2000); //direction change 2 sec cause 2*1000 = 2000, math.
  }

  // Start actions on spawn
  bot.once('spawn', () => {
    setTimeout(() => { // can add online notification with bot.chat('AFK bot online!');
      chatRandom();
      alwaysMove();
    }, 1000);
  });

  // auto reconect
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  // logs errors and kick reasons
  bot.on('error', err => console.log('Bot error:', err));
  bot.on('kicked', reason => console.log('Bot was kicked:', reason));
}

createBot();


