const assert = require('assert');
const repeat_command = require('../../src/repeat_command.js');

describe('repeat_command', () => {
    const { RepeatCommand } = repeat_command;
    describe('RepeatCommand', () => {
        it('should return a function', () => {
            const func = RepeatCommand({}, {});
            assert.strictEqual(typeof func, 'function');
        });
    });

    describe('repeat', () => {
        const logs = [];
        let recentSequence = [];
        let currentConfig = {};
        const session = {
            getRecentSequence: () => recentSequence,
            areEqualRecords: (a, b) => a === b
        };
        const playback = function(session, sequence) {
            logs.push(`playback:${sequence.join('')}`);
            recentSequence = [];
        };
        const getConfig = function() {
            return currentConfig;
        };

        beforeEach(() => {
            logs.length = 0;
            recentSequence = [];
            currentConfig = {};
        });
        it('should detect dmacro and run playback (rule 1)', async () => {
            recentSequence = ['a', 'b', 'c', 'd', 'a', 'b', 'c', 'd'];
            const repeat = RepeatCommand(session, { playback, getConfig });

            await repeat();
            assert.deepStrictEqual(logs, [ 'playback:abcd' ]);
            logs.length = 0;
            await repeat();
            assert.deepStrictEqual(logs, [ 'playback:abcd' ]);
            logs.length = 0;
            await repeat();
            assert.deepStrictEqual(logs, [ 'playback:abcd' ]);
        });
        it('should detect dmacro and run playback (rule 2)', async () => {
            recentSequence = ['a', 'b', 'c', 'd', 'a', 'b'];
            const repeat = RepeatCommand(session, { playback, getConfig });

            await repeat();
            assert.deepStrictEqual(logs, [ 'playback:cd' ]);
            logs.length = 0;
            await repeat();
            assert.deepStrictEqual(logs, [ 'playback:abcd' ]);
            logs.length = 0;
            await repeat();
            assert.deepStrictEqual(logs, [ 'playback:abcd' ]);
        });
        it('should follow the config', async () => {
            recentSequence = ['a', 'a', 'a', 'a', 'a', 'a'];
            currentConfig = { maxMacroLength: 2 };
            const repeat = RepeatCommand(session, { playback, getConfig });
            await repeat();

            assert.deepStrictEqual(logs, [ 'playback:aa' ]);
        });
        it('should serialize consecutive execution of repeat commands', async () => {
            const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
            const playback = async function() {
                logs.push('begin');
                await sleep(50);
                logs.push('end');
            };
            recentSequence = ['a', 'b', 'c', 'a', 'b', 'c'];
            const repeat = RepeatCommand(session, { playback, getConfig });
            const promise1 = repeat();
            const promise2 = repeat();
            await Promise.all([promise1, promise2]);

            assert.deepStrictEqual(logs, [
                'begin',
                'end',
                'begin',
                'end'
            ]);
        });
    });
});
