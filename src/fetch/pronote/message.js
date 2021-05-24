const navigate = require('./navigate');
const parse = require('../../data/types');

/* eslint-disable camelcase */

const PAGE_NAME = 'ListeMessages';
const TAB_ID = 131;
const ACCOUNTS = ['student', 'parent'];

async function getMessage(session, user, ConversationId)
{
    const message = await navigate(session, user, PAGE_NAME, TAB_ID, ACCOUNTS, {
        listePossessionsMessages: [
            {
                N: ConversationId
            }
        ]
    })

    if (!message) {
        return null;
    }

    return ({
        message: parse(message.listeMessages, ({ date, contenu, listeDocumentsJoints, public_gauche, nbPublic }) => ({
            nbPublic,
            ConversationId,
            date: parse(date),
            author: public_gauche,
            content: {
                text: parse(contenu),
                files: parse(listeDocumentsJoints)
            }
        }))
    }).message[0];
}

module.exports = getMessage;
