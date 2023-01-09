const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');

const repeat = async function() {
    const api = await kbmacro.getApi();
    if (!api) {
        return;
    }
    const records = api.getRecentBackgroundRecords();
    console.log(records);

    // repeat the last single command (experimental)
    if (0 < records.length) {
        await vscode.commands.executeCommand(
            'kb-macro.playback',
            {
                sequence: [
                    records[records.length - 1]
                ]
            }
        );
    }
};

function activate(context) {
    context.subscriptions.push(
        vscode.commands.registerCommand(
            'dynamic-macro.repeat',
            repeat
        )
    );

    (async () => {
        const api = await kbmacro.getApi();
        if (api) {
            await api.startBackgroundRecording();
        }
    })();
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
