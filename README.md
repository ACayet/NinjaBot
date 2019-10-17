# PsyBot

## Prérequis

* [NodeJS](https://nodejs.org/en) - Contient le gestionnaire de dependence npm
* [Discord.js](https://discord.js.org/#/docs/main/stable/general/welcome) - Librairie node permettant de manipuler l'api discord
* [Winston](https://www.npmjs.com/package/winston) - Un logger sympa
* [dotenv](https://www.npmjs.com/package/dotenv) - Permet de charger les fichier .env et d'utiliser les variable d'environnement
* [request-promise](https://www.npmjs.com/package/request-promise) - Requetes http asynchrone pour les differentes apis

## Variables d'environement

* PREFIX - Prefixe des commandes dans tout le bot
* DISCORD_TOKEN - Token secret du bot discord
* BOTCOLOR - Couleur utilisé dans les messages rich presence, etc ...
* RISIBANKAPI - Url de l'api risibank

## Commandes possibles

* help - Affiche un message d'aide pour chaque commande ainsi que leurs options
* ping - Affiche le delais de latence entre le bot et le serveur
* avatar - Affiche l'avatar d'un utilisateur
* kick - Kick un utilisateur apres un pile ou face
* risitas - Affiche un risitas aleatoire depuis la risibank
