const test = require('node:test');
const assert = require('node:assert/strict');

const { isPlaceholder } = require('../../../utils/isPlaceholder');

test('isPlaceholder detects placeholder patterns', () => {
  assert.equal(isPlaceholder('your_client_id'), true);
  assert.equal(isPlaceholder('prod_secret'), true);
  assert.equal(isPlaceholder('actualValue'), false);
  assert.equal(isPlaceholder(undefined), false);
});

