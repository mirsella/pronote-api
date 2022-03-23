const { spawn } = require('child_process');
const { join } = require('path');

const DEMO_URL = 'https://demo.index-education.net/pronote/';
const DEMO_USERNAME = 'demonstration';
const DEMO_PASSWORD = 'pronotevs';

function test(type) {
    const child = spawn(join(__dirname, 'fetch.js'), [DEMO_URL, DEMO_USERNAME, DEMO_PASSWORD, 'none', type]);

    child.stdout.on('data', data => {
        // eslint-disable-next-line no-console
        console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', data => {
        if (data.toString().match(/error/ui)) {
            throw new Error(data);
        }
    });
}

['student', 'parent'].forEach(test);
