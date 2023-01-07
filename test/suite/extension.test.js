const assert = require('assert');
const vscode = require('vscode');
const extension = require('../../src/extension.js');

describe('extension', () => {
    before(() => {
        vscode.window.showInformationMessage('Start all tests.');
    });

	it('should export activate and deactivate functions', () => {
		assert.strictEqual(typeof extension.activate, 'function');
		assert.strictEqual(typeof extension.deactivate, 'function');
	});
});
