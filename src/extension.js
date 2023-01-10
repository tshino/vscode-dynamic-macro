const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');
const dmacro = require('./dmacro.js');

const playback = async function(api, sequence) {
    await api.stopBackgroundRecording();
    await vscode.commands.executeCommand(
        'kb-macro.playback',
        { sequence }
    );
    await api.startBackgroundRecording();
}

const repeat = (function() {
    let lastMacro = null;
    return async function(api) {
        const records = api.getRecentBackgroundRecords();
        console.log(records);

        const { macro } = dmacro.detect(records, api.areEqualRecords);
        if (macro) {
            lastMacro = macro;
            await playback(api, macro);
            return;
        }
        if (records.length === 0 && lastMacro) {
            await playback(api, lastMacro);
            return;
        }
        lastMacro = null;
    };
})();

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
