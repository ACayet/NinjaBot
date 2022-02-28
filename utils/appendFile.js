/**
 * Require modules
 * @require
 */
const fs = require('fs');
const { errorMessages } = require('./../config.json');

/**
 * Append content to a file
 * @param {String} filePath
 * @param {Array} contents
 * @param {String} separator
 * @param {Object} channel
 */
const appendFile = (filePath, contents, separator, channel) => {
	try {
		const stream = fs.createWriteStream(filePath, { flags: 'a' });
		contents.forEach(content => stream.write(content + separator));
		stream.end();
	}
	catch (err) {
		channel.send(errorMessages.catchedError);
		console.error(err);
	}
};

module.exports = appendFile;