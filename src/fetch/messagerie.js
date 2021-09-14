const getMessagerie = require('./pronote/messagerie');

async function messagerie(session, user)
{
    const messagerie = await getMessagerie(session, user);
    if (!messagerie) {
        return null;
    }

    const result = [];

    for (const message of messagerie) {
        if (!message.date) {
            continue
        }
        result.push({
            ConversationId: message.ConversationId,
            date: message.date,
            title: message.title,
            seen: message.seen || false,
            author: message.author,
            files: message.files?.split(',\n')
        })
    }

    return result.sort((a, b) => a.date - b.date);
}

module.exports = messagerie;
