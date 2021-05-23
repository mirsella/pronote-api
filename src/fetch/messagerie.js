const getMessagerie = require('./pronote/messagerie');

async function messagerie(session, user)
{
    const messagerie = await getMessagerie(session, user);
    if (!messagerie) {
        return null;
    }

    const result = [];

    for (const message of messagerie) {

        const dates = message.date.split(' ')
        const DateDmy = dates[1].split('/')
        const DateMdy = [DateDmy[1], DateDmy[0], DateDmy[2]]
        const dateh = dates[2].split('h')
        const parseddate = new Date(new Date(DateMdy).setUTCHours(dateh[0], dateh[1], 0, 0))

        result.push({
            ConversationId: message.ConversationId,
            date: parseddate,
            title: message.title,
            seen: message.seen || false,
            author: message.author,
            files: message.files?.split(',\n')
        })
    }

    return result.sort((a, b) => a.date - b.date);
}

module.exports = messagerie;
