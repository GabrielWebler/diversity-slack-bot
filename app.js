require("dotenv").config();
const { App } = require("@slack/bolt");
const { BigQuery } = require('@google-cloud/bigquery');
const { parsedDoc } = require("./services/gsServices");
const express = require('express');
const eapp = express();
const port = process.env.PORT || 3000;

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  port
});

process.env.GOOGLE_APPLICATION_CREDENTIALS = '/app/google_creds.json';
const bigquery = new BigQuery();
const datasetId = 'BotDiv';
const tableId = 'Bot';

async function insertData(term, canal) {
  let channel = await getChannelName(canal);
  const timestamp = Date.now();
  const date_tmp = new Date(timestamp);
  const day = String(date_tmp.getDate()).padStart(2, '0');
  const month = String(date_tmp.getMonth() + 1).padStart(2, '0');
  const year = date_tmp.getFullYear();
  let date = `${year}-${month}-${day}`;
  
  const rows = [{ date, term, channel }];

  try {
    await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);
    console.log('Dados inseridos com sucesso!');
  } catch (error) {
    if (error.name === 'PartialFailureError') {
      console.error('Erro de inserção parcial:');
      error.errors.forEach(err => {
        console.error(error.name);
        console.error(error);
        console.error(err);
        console.error(`- Índice: ${err.index}, Erro: ${err.message}`);
      });
    } else if (error.name === 'AuthenticationError') {
      console.error(error.name);
      console.error(error);
      console.error(err);
      console.error('Erro de autenticação:', error.message);
    } else {
      console.error('Erro geral:', error);
    }
  }
}

const getPatterns = async () => {
    try {
        const doc = await parsedDoc();
        applyListeners(doc);
    } catch (err) {
        console.log(err);
    }
};

async function getChannelName(channelId) {
  try {
    const result = await app.client.conversations.info({ channel: channelId });
    return result.channel.name;
  } catch (error) {
    console.error(`Error retrieving channel information: ${error}`);
    return null;
  }
}

const applyListeners = (patterns) => {
  for (let words of patterns) {
    const { termo, explicacao, sugestoes } = words;
    let regexPattern = new RegExp(termo, "gi");
    const hasSuggestion = sugestoes
      ? {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "🌈 *Você pode dizer* " + `${sugestoes}`,
            },
          ],
        }
      : {};

    app.message(regexPattern, async ({ message, client }) => {
      try {
        await client.chat.postEphemeral({
          channel: message.channel,
          user: message.user,
          blocks: [
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `Olá <@${message.user}>!`,
                },
              ],
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `💬 *Você disse* "${message.text}"`,
                },
              ],
            },
            {
              type: "context",
              elements: [
                {
                  type: "mrkdwn",
                  text: `🤔 *Por que corrigir?*  ${explicacao}`,
                },
              ],
            },
            hasSuggestion,
          ],
          text: "Deu algo de errado com as nossas sugestões 😔",
        });
        insertData(termo, message.channel)
      } catch (error) {
        console.error(error);
      }
    });
  }
};

(async () => {
  await getPatterns();
  await app.start();

  console.log("⚡️ app is running! aeeeeeeeeeee");
})();

eapp.get('/', (req, res) => {
  res.send('flu.ke')
})

eapp.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

