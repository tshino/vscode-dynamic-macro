const assert = require('assert');
const dmacro = require('../../src/dmacro.js');

describe('dmacro', () => {
    describe('detect', () => {
        const detect = dmacro.detect;
        const eq = (a, b) => a === b;

        it('should return empty for empty input', () => {
            assert.deepStrictEqual(
                detect([], eq),
                {}
            );
        });
        it('should return empty if no repeat found', () => {
            assert.deepStrictEqual(
                detect(['a'], eq),
                {}
            );
            assert.deepStrictEqual(
                detect(['a', 'b', 'c'], eq),
                {}
            );
        });

        describe('rule1', () => {
            it('should detect repeat of the same sequence as rule1', () => {
                assert.deepStrictEqual(
                    detect(['a', 'a'], eq),
                    { macro: ['a'] }
                );
                assert.deepStrictEqual(
                    detect(['a', 'b', 'a', 'b'], eq),
                    { macro: ['a', 'b'] }
                );
                assert.deepStrictEqual(
                    detect(['a', 'b', 'c', 'a', 'b', 'c'], eq),
                    { macro: ['a', 'b', 'c'] }
                );
            });
            it('should detect twice repeat with leading irrelevant input', () => {
                assert.deepStrictEqual(
                    detect(['x', 'y', 'a', 'a'], eq),
                    { macro: ['a'] }
                );
                assert.deepStrictEqual(
                    detect(['x', 'y', 'a', 'b', 'a', 'b'], eq),
                    { macro: ['a', 'b'] }
                );
                assert.deepStrictEqual(
                    detect(['x', 'y', 'a', 'b', 'c', 'a', 'b', 'c'], eq),
                    { macro: ['a', 'b', 'c'] }
                );
            });
            it('should find longest match', () => {
                assert.deepStrictEqual(
                    detect(['f', 'o', 'o', 'f', 'o', 'o'], eq),
                    { macro: ['f', 'o', 'o'] }
                );
            });
        });

        describe('rule2', () => {
            it('should detect partial repeat of the same sequence as rule2', () => {
                assert.deepStrictEqual(
                    detect(['a', 'b', 'a'], eq),
                    { macro: ['a', 'b'], position: 1 }
                );
                assert.deepStrictEqual(
                    detect(['a', 'b', 'c', 'a', 'b'], eq),
                    { macro: ['a', 'b', 'c'], position: 2 }
                );
                assert.deepStrictEqual(
                    detect(['a', 'b', 'c', 'a', 'b', 'a', 'b', 'c'], eq),
                    { macro: ['a', 'b', 'c', 'a', 'b'], position: 3 }
                );
            });
            it('should detect partial repeat with leading irrelevant input', () => {
                assert.deepStrictEqual(
                    detect(['x', 'y', 'a', 'b', 'c', 'a'], eq),
                    { macro: ['a', 'b', 'c'], position: 1 }
                );
            });
            it('should find longest match', () => {
                assert.deepStrictEqual(
                    detect(['b', 'c', 'a', 'b', 'c', 'd', 'a', 'b', 'c'], eq),
                    { macro: ['a', 'b', 'c', 'd'], position: 3 }
                );
            });
            it('should find longest and least distant match', () => {
                assert.deepStrictEqual(
                    detect(['a', 'b', 'c', 'a', 'b', 'c', 'd', 'a', 'b', 'c'], eq),
                    { macro: ['a', 'b', 'c', 'd'], position: 3 }
                );
            });
        });

        describe('maxMacroLength', () => {
            it('should specifies the limit of macro length', () => {
                const input = ['a', 'b', 'c', 'd', 'e', 'a', 'b', 'c', 'd', 'e'];
                assert.deepStrictEqual(
                    detect(input, eq, { maxMacroLength: 5 }),
                    { macro: ['a', 'b', 'c', 'd', 'e'] }
                );
                assert.deepStrictEqual(
                    detect(input, eq, { maxMacroLength: 4 }),
                    {}
                );
            });
        });
    });
});
