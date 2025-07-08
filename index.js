const mineflayer = require('mineflayer');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: '94.136.190.76',
    port: 25089,
    username: 'aurora_assistant',
    version: '1.21.4'
  });

  // AuthMe / Login/Register & Teleport Request Handling
  bot.on('message', (message) => {
    const msg = message.toString().toLowerCase();

    if (msg.includes('/register')) {
      bot.chat('/register Bot@12345 Bot@12345');
    } else if (msg.includes('/login')) {
      bot.chat('/login Bot@12345');
    }

    if (
      msg.includes('has requested to teleport to you') ||
      msg.includes('wants to teleport to you') ||
      msg.includes('sent you a teleport request') ||
      msg.includes('has requested that you teleport to them') ||
      msg.includes('wants you to teleport to them')
    ) {
      console.log('Teleport request detected! Accepting...');
      bot.chat('/tpaccept');
    }
  });

  // Public Chat Handler
  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    console.log(`[Public] <${username}>: ${message}`);

    const lower = message.toLowerCase();

    if (lower.startsWith('!')) {
      const args = lower.slice(1).split(' ');
      const command = args.shift();

      if (command === 'help') {
        bot.chat(`Hi ${username}, I can respond to "hello", "how are you", or commands like !help, !ping, and !sunilgaming.`);
      } else if (command === 'sunilgaming') {
        bot.chat(`Hey ${username}, sunilgaming created me! He is my owner.`);
      } else if (command === 'ping') {
        bot.chat(`Pong, ${username}!`);
      } else {
        bot.chat(`Sorry ${username}, unknown command.`);
      }
    } else {
      if (lower.includes('hello')) {
        bot.chat(`Hi ${username}!`);
      } else if (lower.includes('how are you')) {
        bot.chat(`I'm just a bot, but thanks for asking, ${username}!`);
      }
    }
  });

  // Whisper Handler
  bot.on('whisper', (username, message) => {
    if (username === bot.username) return;

    console.log(`[Whisper] <${username}>: ${message}`);
    bot.whisper(username, `Hello ${username}, I got your message!`);
  });

  // Simulated AFK Movement
  function randomMovement() {
    const directions = ['forward', 'back', 'left', 'right'];
    const dir = directions[Math.floor(Math.random() * directions.length)];

    bot.setControlState(dir, true);
    setTimeout(() => {
      bot.setControlState(dir, false);
      setTimeout(randomMovement, 2000);
    }, 3000);
  }

  bot.once('spawn', () => {
    bot.chat('AFK bot online!');
    randomMovement();
  });

  // Reconnect Logic
  bot.on('end', () => {
    console.log('Bot disconnected. Reconnecting in 5 seconds...');
    setTimeout(createBot, 5000);
  });

  bot.on('error', err => {
    console.log('Bot error:', err);
  });

  bot.on('kicked', reason => {
    console.log('Bot was kicked:', reason);
  });
}

createBot();
