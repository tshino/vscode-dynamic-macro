const vscode = require('vscode');

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

module.exports = {
    playback,
    getConfig
};
