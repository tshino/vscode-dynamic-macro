const vscode = require('vscode');
const kbmacro = require('./kbmacro.js');
const dmacro = require('./dmacro.js');
const reentrantGuard = require('./reentrant_guard.js');

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

const RepeatCommand = function(session) {
    let lastMacro = null;

    const repeat = reentrantGuard.makeQueueableCommand(async function() {
        const records = session.getRecentSequence();
        const config = getConfig();

        const { macro, position=0 } = dmacro.detect(records, session.areEqualRecords, config);
        if (macro) {
            lastMacro = macro;
            await playback(session, macro.slice(position));
            return;
        }
        if (records.length === 0 && lastMacro) {
            await playback(session, lastMacro);
            return;
        }
        lastMacro = null;
    }, { queueSize: 2 });

    return repeat;
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
        repeat = RepeatCommand(session);
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
