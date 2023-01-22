const vscode = require('vscode');
const util = require('./util.js');
const kbmacro = require('./kbmacro.js');
const { RepeatCommand } = require('./repeat_command.js');

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
        repeat = RepeatCommand(session, util);
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}
