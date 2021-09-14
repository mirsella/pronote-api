const navigate = require('./navigate');

const PAGE_NAME = 'ListeMessagerie';
const TAB_ID = 131;
const ACCOUNTS = ['student', 'parent'];

async function getMessagerie(session, user)
{
    const messagerie = await navigate(session, user, PAGE_NAME, TAB_ID, ACCOUNTS, {
        avecLu: true,
        avecMessage: true
    });

    if (!messagerie) {
        return null;
    }

    const result = []

    let lastdata = ''
    for (const message of messagerie.listeMessagerie.V) {
        if (message.N === '0') {
            lastdata = message
        } else {
            result.push({
                ConversationId: message.listePossessionsMessages.V[0].N,
                title: lastdata.objet,
                date: lastdata.libelleDate,
                author: lastdata.initiateur,
                seen: lastdata.lu || false,
                files: lastdata.documentsJoints || null
            })
        }
    }

    return result;
}

module.exports = getMessagerie;
