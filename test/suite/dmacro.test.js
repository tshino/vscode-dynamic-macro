const assert = require('assert');
const dmacro = require('../../src/dmacro.js');

describe('dmacro', () => {
    describe('detect', () => {
        const detect = dmacro.detect;
        const eq = (a, b) => a === b;

        it('should return empty for empty input', () => {
            assert.deepStrictEqual(detect([], eq), []);
        });
        it('should return empty if no repeat found', () => {
            assert.deepStrictEqual(detect(['a'], eq), []);
            assert.deepStrictEqual(detect(['a', 'b', 'c'], eq), []);
        });
        describe('rule1', () => {
            it('should detect repeat of the same sequence as rule1', () => {
                assert.deepStrictEqual(detect(['a', 'a'], eq), ['a']);
                assert.deepStrictEqual(detect(['a', 'b', 'a', 'b'], eq), ['a', 'b']);
                assert.deepStrictEqual(detect(['a', 'b', 'c', 'a', 'b', 'c'], eq), ['a', 'b', 'c']);
            });
            it('should detect twice repeat with leading irrelevant input', () => {
                assert.deepStrictEqual(detect(['x', 'y', 'a', 'a'], eq), ['a']);
                assert.deepStrictEqual(detect(['x', 'y', 'a', 'b', 'a', 'b'], eq), ['a', 'b']);
                assert.deepStrictEqual(detect(['x', 'y', 'a', 'b', 'c', 'a', 'b', 'c'], eq), ['a', 'b', 'c']);
            });
            it('should find longest match', () => {
                assert.deepStrictEqual(detect(['f', 'o', 'o', 'f', 'o', 'o'], eq), ['f', 'o', 'o']);
            });
        });
        // TODO: test for rule2
    });
});
