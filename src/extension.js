const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');
const dmacro = require('./dmacro.js');
const reentrantGuard = require('./reentrant_guard.js');

const playback = async function(api, sequence) {
    await api.stopBackgroundRecording();
    await vscode.commands.executeCommand(
        'kb-macro.playback',
        { sequence }
    );
    await api.startBackgroundRecording();
}

const getConfig = function() {
    const config = vscode.workspace.getConfiguration('dynamicMacro');
    return config;
};

let lastMacro = null;
const repeatCommand = reentrantGuard.makeQueueableCommand(
    async function(api) {
        const records = api.getRecentBackgroundRecords();
        const config = getConfig();

        const { macro, position=0 } = dmacro.detect(records, api.areEqualRecords, config);
        if (macro) {
            lastMacro = macro;
            await playback(api, macro.slice(position));
            return;
        }
        if (records.length === 0 && lastMacro) {
            await playback(api, lastMacro);
            return;
        }
        lastMacro = null;
    },
    { queueSize: 2 }
);

function activate(context) {
    let api = null;

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'dynamic-macro.repeat',
            function() {
                if (api) {
                    // Discard the returned Promise to avoid potential deadlock.
                    repeatCommand(api);
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
