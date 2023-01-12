// https://github.com/tshino/vscode-kb-macro/blob/main/src/reentrant_guard.js

const reentrantGuard = (function() {

    const state = {
        locked: false,
        queueable: false
    };
    const queue = [];
    const deferedFunctions = [];

    let printError = defaultPrintError;
    function defaultPrintError(error) {
        console.error(error);
        console.info('dynamic-macro: Exception in guarded command');
    };
    const setPrintError = function(printErrorImpl) {
        const old = printError;
        printError = printErrorImpl;
        return old;
    };

    const callDeferedFunctions = function() {
        while (0 < deferedFunctions.length) {
            const func = deferedFunctions.shift();
            func();
        }
    };

    const makeGuardedCommand = function(body) {
        return async function(args) {
            if (state.locked) {
                return;
            }
            state.locked = true;
            try {
                await body(args);
            } catch (error) {
                printError(error);
            } finally {
                callDeferedFunctions();
                state.locked = false;
            }
        };
    };
    const makeGuardedCommandSync = function(func) {
        return function(args) {
            if (state.locked) {
                return;
            }
            state.locked = true;
            try {
                func(args);
            } catch (error) {
                printError(error);
            } finally {
                callDeferedFunctions();
                state.locked = false;
            }
        };
    };
    const makeQueueableCommand = function(body, { queueSize = 0 } = {}) {
        return async function(args) {
            if (state.locked) {
                if (!state.queueable) {
                    return;
                }
                if (queueSize && queue.length >= queueSize) {
                    return;
                }
                await new Promise(resolve => {
                    queue.push(resolve);
                });
            } else {
                state.locked = true;
                state.queueable = true;
            }
            try {
                await body(args);
            } catch (error) {
                printError(error);
            } finally {
                if (0 < queue.length) {
                    const resolve = queue[0];
                    queue.splice(0, 1);
                    resolve();
                } else {
                    callDeferedFunctions();
                    state.locked = false;
                    state.queueable = false;
                }
            }
        };
    };
    const callExclusively = async function(func) {
        if (state.locked) {
            await new Promise(resolve => {
                deferedFunctions.push(() => {
                    func();
                    resolve();
                });
            });
        } else {
            func();
        }
    };

    return {
        makeGuardedCommand,
        makeGuardedCommandSync,
        makeQueueableCommand,
        callExclusively,

        // testing purpose only
        setPrintError,
        getQueueLength: function() { return queue.length; }
    };
})();

module.exports = reentrantGuard;
