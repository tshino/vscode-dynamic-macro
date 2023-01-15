const vscode = require('vscode');

const error = function(message) {
    console.error(message);
    vscode.window.showErrorMessage(message);
};


const getApi = (function() {
    let api = null;

    return async function() {
        if (api) {
            return api;
        }
        const extension = vscode.extensions.getExtension('tshino.kb-macro');
        if (!extension) {
            error('Dynamic Macro: The Keyboard Macro Beta extension not found.');
            return;
        }
        if (!extension.isActive) {
            api = await extension.activate();
        } else {
            api = extension.exports;
        }
        if (!api) {
            error('Dynamic Macro: The Keyboard Macro Beta extension seems to have no API.');
            return;
        }
        const requiredApis = [
            'newSession',
        ];
        for (const func of requiredApis) {
            if (!(func in api)) {
                error(`Dynamic Macro: The Keyboard Macro Beta extension does not have the ${func} API.`);
                return;
            }
        }
        return api;
    };
})();

module.exports = {
    getApi
};
