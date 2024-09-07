# diversity-slack-bot

The Diversity Bot is a Slack App which passively listens for language with racist, ableist, sexist, or other exclusionary histories. When it hears such words or phrases, it quietly lets the speaker know and offers some suggestions. Inclusive culture is built one interaction at a time, and inclusive language is the foundation — this bot helps us practice our inclusive values in Slack. Also collects the date, terms and channels it's been sented in a Google BigQuery.

Example Sheet - [Link](https://docs.google.com/spreadsheets/d/1JhWY6jHwwnLRFrMipVOeCmwCBTWUohUIgnLelvADV3w/edit#gid=0)

## Settings in Slack
Create a bot in Slack with the following settings:

## OAuth & Permissions
### Bot Token Scopes
* channels:history
* channels:join
* channels:read
* chat:write
* metadata.message:read

### User Token Scopes
* channels:read
* chat:write

## Event Subscriptions
### Subscribe to bot events
* message.channels

## Settings for Google service account
* Create a project
* Create a service account
* Create an API key in JSON format

## Settings for Google BigQuery
* Create a relational database with the fields date (Type DATE), term (STRING), channel (STRING)

-----

O Diversity Bot (robô de Diversidade) é uma aplicação para Slack que monitora o uso de linguagem racista, capacitista, machista e de caráter excludente. Ao ouvir esses tipos de palavras ou frases, a aplicação alerta à pessoa usuária de maneira privada e ainda oferece sugestões de substituições. Cultura de inclusão é construída um passo de cada vez, comçando pela linguagem - este robô nos ajuda a praticar valores de inclusão dentro do Slack. Também faz a inclusão dos termos e qual canal foi enviado com a data em um banco no Google BigQuery.

Planilha de exemplo - [Link](https://docs.google.com/spreadsheets/d/1JhWY6jHwwnLRFrMipVOeCmwCBTWUohUIgnLelvADV3w/edit#gid=0)


## Configurações no Slack
Crie um bot no Slack com as configuraçoes abaixo:

## OAuth & Permissions
### Bot Token Scopes
* channels:history
* channels:join
* channels:read
* chat:write
* metadata.message:read

### User Token Scopes
* channels:read
* chat:write

## Event Subscriptions
### Subscribe to bot events
* message.channels


## Configurações para conta de serviço do Google
* Crie um projeto
* Crie uma conta de serviço
* Crie uma chave de API no formato JSON

## Configurações para Google BigQuery
* Crie uma base relacional com os campos date (Tipo DATE), term (STRING), channel (STRING)