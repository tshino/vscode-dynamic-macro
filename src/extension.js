const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');
const dmacro = require('./dmacro.js');

const repeat = async function(api) {
    const records = api.getRecentBackgroundRecords();
    console.log(records);

    const sequenceToExecute = dmacro.detect(records, api.areEqualRecords);
    if (0 < sequenceToExecute.length) {
        await vscode.commands.executeCommand(
            'kb-macro.playback',
            { sequence: sequenceToExecute }
        );
    }
};

function activate(context) {
    let api = null;

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'dynamic-macro.repeat',
            async function() {
                if (api) {
                    await repeat(api);
                }
            }
        )
    );

    kbmacro.getApi().then(async kbmacroApi => {
        await kbmacroApi.startBackgroundRecording();
        api = kbmacroApi;
    });
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
