const assert = require('assert');
const dmacro = require('../../src/dmacro.js');

describe('dmacro', () => {
    describe('detect', () => {
        const detect = dmacro.detect;
        const eq = (a, b) => a == b;

        it('should return empty for empty input', () => {
            assert.deepStrictEqual(detect([], eq), []);
        });
        describe('rule1', () => {
            it('should detect repeat of the same sequence as rule1', () => {
                assert.deepStrictEqual(detect(['a', 'a'], eq), ['a']);
                // assert.deepStrictEqual(detect(['a', 'b', 'a', 'b'], eq), ['a', 'b']);
                // assert.deepStrictEqual(detect(['a', 'b', 'c', 'a', 'b', 'c'], eq), ['a', 'b', 'c']);
            });
        });
    });
});
