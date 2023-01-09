const vscode = require('vscode');

const getApi = (function() {
    let api = null;

    return async function() {
        if (api) {
            return api;
        }
        const extension = vscode.extensions.getExtension('tshino.kb-macro');
        if (!extension) {
            console.error('Dynamic Macro: The Keyboard Macro Beta extension not found.');
            return;
        }
        if (!extension.isActive) {
            api = await extension.activate();
        } else {
            api = extension.exports;
        }
        if (!api) {
            console.error('Dynamic Macro: The Keyboard Macro Beta extension seems to have no API.');
            return;
        }
        const requiredApis = [
            'startBackgroundRecording',
            'stopBackgroundRecording',
            'getRecentBackgroundRecords',
            'areEqualRecords',
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

module.exports = {
    getApi
};
