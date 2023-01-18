const dmacro = require('./dmacro.js');
const reentrantGuard = require('./reentrant_guard.js');

const RepeatCommand = function(session, { playback, getConfig }) {
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

module.exports = {
    RepeatCommand
};
