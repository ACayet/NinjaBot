# NinjaBot

[![Node CI](https://github.com/ACayet/NinjaBot/actions/workflows/github-ci.yml/badge.svg?branch=main)](https://github.com/ACayet/NinjaBot/actions/workflows/github-ci.yml)

## Prérequis

* [NodeJS](https://nodejs.org/en) - Contient le gestionnaire de dependence npm
* [Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) - Librairie node permettant de manipuler l'api discord
* [Winston](https://www.npmjs.com/package/winston) - Un logger sympa
* [dotenv](https://www.npmjs.com/package/dotenv) - Permet de charger les fichier .env et d'utiliser les variable d'environnement
* [request-promise](https://www.npmjs.com/package/request-promise) - Requetes http asynchrone pour les differentes apis
* [url-status-code](https://www.npmjs.com/package/url-status-code) - Renvoie le status http d'une url
* [http-status-codes](https://www.npmjs.com/package/http-status-codes) - Liste de constantes representants les status http

## Variables d'environement

* DISCORD_TOKEN - Token secret du bot discord
* BOTCOLOR - Couleur utilisé dans les messages rich presence, etc ...
* RISIBANKAPI - Url de l'api risibank

## Commandes possibles

* help - Affiche un message d'aide pour chaque commande ainsi que leurs options
* ping - Affiche le delais de latence entre le bot et le serveur
* avatar - Affiche l'avatar d'un utilisateur
* kick - Kick un utilisateur apres un pile ou face
* disconnect - Deconnecte un utilisateur apres un pile ou face
* risitas - Affiche un risitas aleatoire depuis la risibank

## Droits necessaires par commande

Droits generaux : View Channels, Send Messages

* help - Aucun droits speciaux
* ping - Aucun droits speciaux
* avatar - Aucun droits speciaux
* kick - Kick Members
* disconnect - Move Members
* risitas - Aucun droits speciaux
