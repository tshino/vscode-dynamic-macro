const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');
const { RepeatCommand } = require('./repeat_command.js');

const playback = async function(session, sequence) {
    await session.stopRecording();
    await vscode.commands.executeCommand(
        'kb-macro.playback',
        { sequence }
    );
    await session.startRecording();
};

const getConfig = function() {
    const config = vscode.workspace.getConfiguration('dynamicMacro');
    return config;
};

function activate(context) {
    let repeat = null;

    context.subscriptions.push(
        vscode.commands.registerCommand(
            'dynamic-macro.repeat',
            function() {
                if (repeat) {
                    // Discard the returned Promise to avoid potential deadlock.
                    repeat();
                }
            }
        )
    );

    kbmacro.getApi().then(async api => {
        const session = api.newSession();
        context.subscriptions.push(
            new vscode.Disposable(() => session.close)
        );
        await session.startRecording();
        repeat = RepeatCommand(session, { playback, getConfig });
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
