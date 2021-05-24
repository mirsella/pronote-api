const navigate = require('./navigate');

const PAGE_NAME = 'ListeMessagerie';
const TAB_ID = 131;
const ACCOUNTS = ['student', 'parent'];

async function getMessagerie(session, user)
{
    const messagerie = await navigate(session, user, PAGE_NAME, TAB_ID, ACCOUNTS, {
        avecLu: true,
        avecMessage: true,
        possessionMessageDiscussionUnique: null
    });

    if (!messagerie) {
        return null;
    }

    const result = []

    let nextObjet = ''
    for (const message of messagerie.listeMessagerie.V) {
        if (message.N === '0') {
            nextObjet = message.objet
        } else {
            result.push({
                ConversationId: message.listePossessionsMessages.V[0].N,
                title: nextObjet,
                date: message.libelleDate,
                author: message.public_gauche,
                seen: message.lu,
                files: message.documentsJoints
            })
        }
    }

    return result;
}

module.exports = getMessagerie;
