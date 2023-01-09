const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');
const dmacro = require('./dmacro.js');

const repeat = async function() {
    kbmacro.getApi().then(async api => {
        const records = api.getRecentBackgroundRecords();
        console.log(records);

        const sequenceToExecute = dmacro.detect(records, api.areEqualRecords);
        if (0 < sequenceToExecute.length) {
            await vscode.commands.executeCommand(
                'kb-macro.playback',
                { sequence: sequenceToExecute }
            );
        }
    });
};

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'dynamic-macro.repeat',
            repeat
        )
    );

    kbmacro.getApi().then(async api => {
        await api.startBackgroundRecording();
    });
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
