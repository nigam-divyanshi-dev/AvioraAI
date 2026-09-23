import test from 'node:test';
import assert from 'node:assert/strict';

import protect from './auth.middleware.js';
import redis from '../../shared/redis/redis.js';

test('protect reads the correct redis session key and attaches the user', async () => {
  const req = {
    cookies: { session: 'abc-123' },
  };

  const res = {
    status(code) {
      this.code = code;
      return this;
    },
    json(payload) {
      this.payload = payload;
      return this;
    },
  };

  let calledKey = null;
  const originalGet = redis.get.bind(redis);
  redis.get = async (key) => {
    calledKey = key;
    return JSON.stringify({ userId: 'user-1', name: 'Jane Doe' });
  };

  let nextCalled = false;
  await protect(req, res, () => {
    nextCalled = true;
  });

  assert.equal(calledKey, 'session-abc-123');
  assert.equal(nextCalled, true);
  assert.equal(req.user.name, 'Jane Doe');

  redis.get = originalGet;
});
