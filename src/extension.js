const vscode = require('vscode');

const getKbmacroApi = (function() {
    let api = null;

    return async function() {
        if (api) {
            return api;
        }
        const kbmacro = vscode.extensions.getExtension('tshino.kb-macro');
        if (!kbmacro) {
            console.error('Dynamic Macro: The Keyboard Macro Beta extension not found.');
            return;
        }
        if (!kbmacro.isActive) {
            api = await kbmacro.activate();
        } else {
            api = kbmacro.exports;
        }
        if (!api) {
            console.error('Dynamic Macro: The Keyboard Macro Beta extension seems to have no API.');
            return;
        }
        const requiredApis = [
            'startBackgroundRecording',
            'stopBackgroundRecording',
            'getRecentBackgroundRecords',
        ];
        for (const func of requiredApis) {
            if (!(func in api)) {
                console.error(`Dynamic Macro: The Keyboard Macro Beta extension does not have the ${func} API.`);
                return;
            }
        }
        return api;
    };
})();

const repeat = async function() {
    const api = await getKbmacroApi();
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
        const api = await getKbmacroApi();
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
