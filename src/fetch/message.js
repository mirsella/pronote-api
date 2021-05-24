const getMessage = require('./pronote/message');
const { withId } = require('../data/id');
const { getFileURL } = require('../data/files');
const fromHTML = require('../data/html');

async function message(session, user, ConversationId)
{
    const message = await getMessage(session, user, ConversationId);

    if (!message) {
        return null;
    }

    const result = {
        date: message.date,
        nbPublic: message.nbPublic,
        ConversationId: message.ConversationId,
        author: message.author,
        content: fromHTML(message.content.text),
        htmlContent: message.content.text,
        files: message.content.files?.map(f => withId({ name: f.name, url: getFileURL(session, f) }, ['name']))
    }

    return result
}

module.exports = message;
