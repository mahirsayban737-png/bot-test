const express = require('express');
const mineflayer = require('mineflayer');
const { pathfinder, Movements } = require('mineflayer-pathfinder');

const BOT_CONFIG = {
  host: 'nl-01.freezehost.pro',
  port: 10380,
  username: 'lian_0_0',
  master: 'lian_0_0',
  auth: 'offline',
  version: '1.20.1',
  // THIS IS THE FIX: Wait 60 seconds before timing out, to handle server lag.
  checkTimeoutInterval: 60 * 1000 
};

const app = express();
const port = process.env.PORT || 3000;
app.all('/', (req, res) => res.send('Bot is alive.'));
app.listen(port, () => console.log(`[System] Health-check server is ready.`));

function createBot() {
  console.log(`[System] Connecting...`);
  const bot = mineflayer.createBot(BOT_CONFIG);

  bot.loadPlugin(pathfinder);

  bot.on('spawn', () => {
    console.log("[System] Bot has spawned.");
    bot.chat("Bot online. Standing by.");
    // We will not make the bot move, to reduce server load. It will just stand still.
  });

  const handleDisconnect = (reason) => {
    console.log(`[System] Disconnected. Reason: ${reason}. Reconnecting in 60s.`);
    setTimeout(createBot, 60000); // Wait a full minute before reconnecting.
  };

  bot.on('kicked', handleDisconnect);
  bot.on('end', handleDisconnect);
  bot.on('error', () => {}); // Let 'end' handle it.
}

createBot();
